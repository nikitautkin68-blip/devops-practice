import os

import redis
from flask import Flask, jsonify
from redis.exceptions import RedisError

app = Flask(__name__)
redis_client = redis.Redis(
    host=os.environ.get("REDIS_HOST", "localhost"),
    port=6379,
    decode_responses=True,
    socket_connect_timeout=2,
    socket_timeout=2,
)


@app.route('/')
def home():
    try:
        visits = redis_client.incr("visits")
    except RedisError:
        app.logger.exception("Could not reach Redis while serving the home page")
        return jsonify(status="error", message="Counter service unavailable"), 503
    return jsonify(
        message="Flask + Redis + Nginx в Docker Compose",
        visits=visits,
    )


@app.route('/health')
def health():
    return jsonify(status="ok")


@app.route('/ready')
def ready():
    try:
        redis_client.ping()
    except RedisError:
        app.logger.exception("Redis readiness check failed")
        return jsonify(status="error", redis="unavailable"), 503
    return jsonify(status="ok", redis="connected")
