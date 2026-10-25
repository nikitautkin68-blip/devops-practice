from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return """
    <h1>🚀 Chapter 4 — Реальный стек</h1>
    <p>Flask + Redis + Nginx в Docker Compose</p>
    <p>Глава 4 в процессе изучения</p>
    """

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
