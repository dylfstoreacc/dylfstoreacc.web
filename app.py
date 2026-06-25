from flask import Flask, render_template, request, redirect, url_for
import os
import json
from datetime import datetime

app = Flask(__name__)

JSON_FILE = 'ulasan.json'
PIN_ADMIN = "1234"  # PIN Rahasia Kamu

def load_ulasan():
    if not os.path.exists(JSON_FILE):
        data_awal = [{
            "id": 1719000000000,
            "nama": "Rian_Siber",
            "rating": 5,
            "text": "Mantap banget beli akun ML di DYLF STOREacc! Prosesnya instan lewat grup WA, admin Fast Respon dan amanah pol. Sangat recommended! 🔥🌱",
            "tanggal": datetime.now().strftime("%Y-%m-%d"),
            "status": "approved"
        }]
        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(data_awal, f, indent=4, ensure_all_ascii=False)
        return data_awal
    
    try:
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            content = f.read().strip()
            if not content:
                return []
            return json.loads(content)
    except Exception:
        return []

def save_ulasan(data):
    try:
        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_all_ascii=False)
    except Exception as e:
        print(f"Gagal menulis database JSON: {e}")

def get_sorted_images(folder_path):
    if not os.path.exists(folder_path): return []
    valid_extensions = ('.png', '.jpg', '.jpeg', '.webp')
    all_files = [f for f in os.listdir(folder_path) if f.lower().endswith(valid_extensions)]
    file_list_with_time = []
    for file_name in all_files:
        full_path = os.path.join(folder_path, file_name)
        try:
            timestamp = os.path.getmtime(full_path)
            file_list_with_time.append([file_name, timestamp])
        except Exception:
            file_list_with_time.append([file_name, 0])
    file_list_with_time.sort(key=lambda x: x[1], reverse=True)
    return [item[0] for item in file_list_with_time]

@app.route('/')
def index():
    stok_dir = os.path.join('static', 'testi', 'stok')
    rekber_dir = os.path.join('static', 'testi', 'rekber')
    
    foto_stok = get_sorted_images(stok_dir)
    foto_rekber = get_sorted_images(rekber_dir)
    
    raw_list = load_ulasan()
    token = request.args.get('admin_token', '').strip()
    is_admin = (token == PIN_ADMIN)
    
    daftar_ulasan = list(raw_list)[::-1]
    nav_target = request.args.get('nav', 'home')
    
    return render_template('index.html', 
                           foto_stok=foto_stok, 
                           foto_rekber=foto_rekber, 
                           daftar_ulasan=daftar_ulasan, 
                           nav_target=nav_target, 
                           is_admin=is_admin, 
                           admin_token=token)

@app.route('/tambah_ulasan', methods=['POST'])
def tambah_ulasan():
    nama = request.form.get('nama', '').strip()
    try:
        rating = int(request.form.get('rating', '5'))
    except ValueError:
        rating = 5
    text = request.form.get('text', '').strip()
    admin_token = request.form.get('admin_token', '').strip()
    
    if nama and text:
        current_data = load_ulasan()
        
        # Mengunci data baru mutlak dengan status 'pending' agar tersaring rapi di database
        ulasan_baru = {
            "id": int(datetime.now().timestamp() * 1000),
            "nama": str(nama),
            "rating": int(rating),
            "text": str(text),
            "tanggal": datetime.now().strftime("%Y-%m-%d"),
            "status": "pending"
        }
        
        current_data.append(ulasan_baru)
        save_ulasan(current_data)
        
    # Jalur pembalikan halaman setelah sukses simpan data
    if admin_token == PIN_ADMIN:
        return redirect(url_for('index', nav='admin', admin_token=admin_token))
    return redirect(url_for('index', nav='ulasan'))

@app.route('/action_ulasan/<action>/<int:ulasan_id>')
def action_ulasan(action, ulasan_id):
    token = request.args.get('admin_token', '').strip()
    if token != PIN_ADMIN:
        return redirect(url_for('index', nav='ulasan'))
        
    current_data = load_ulasan()
    
    if action == "approve":
        for item in current_data:
            if item.get('id') == ulasan_id:
                item['status'] = 'approved'
                break
    elif action == "delete":
        current_data = [item for item in current_data if item.get('id') != ulasan_id]
        
    save_ulasan(current_data)
    return redirect(url_for('index', nav='admin', admin_token=token))

if __name__ == '__main__':
    app.run(debug=True, port=5000)