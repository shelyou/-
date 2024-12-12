from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import bcrypt
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
SECRET_KEY = 'your_secret_key_here'  # Ganti dengan kunci rahasia yang lebih aman

# Data Pengguna (Simulasi database)
users = {
    "h5vqeq62ns2wd6fjk2svhl7ujdf2ex4bhpf2jfyzs26z3sb5chve2a3x@onion": {
        "password": generate_password_hash("Xy!7dK2z#Vb"),
    },
    "i7x9n3zrf5z7glkpw9hyb4rt64psq7b27sc1jp5fnb9o2elphg9d@onion": {
        "password": generate_password_hash("T9^aL8&m@dC"),
    },
    # Tambahkan pengguna lain sesuai dengan daftar yang Anda berikan
}

# Fungsi untuk mengenkripsi dan membuat JWT token
def encode_token(username):
    return jwt.encode({
        'username': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm='HS256')

# Dekorator untuk memverifikasi token JWT
def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = data['username']
        except:
            return jsonify({'message': 'Token is invalid!'}), 403
        return f(current_user, *args, **kwargs)
    return decorated_function

# Route untuk login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in users:
        stored_password = users[username]["password"]
        if check_password_hash(stored_password, password):
            token = encode_token(username)
            return jsonify({'success': True, 'token': token})
    
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

# Route untuk mengakses halaman setelah login
@app.route('/dashboard', methods=['GET'])
@token_required
def dashboard(current_user):
    return jsonify({'message': f'Welcome {current_user} to your dashboard!'})

if __name__ == '__main__':
    app.run(debug=True, ssl_context=('cert.pem', 'key.pem'))  # Mengaktifkan HTTPS
