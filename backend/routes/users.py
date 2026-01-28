from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import User
from extensions import db

users_bp = Blueprint("users", __name__)

# ---------- READ ALL USERS ----------
@users_bp.route("/", methods=["GET", "OPTIONS"])
@jwt_required(optional=True)
def get_users():
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return jsonify({}), 200

    users = User.query.all()
    return jsonify([
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role
        } for u in users
    ])


# ---------- CREATE USER ----------
@users_bp.route("/", methods=["POST", "OPTIONS"])
@jwt_required(optional=True)
def create_user():
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return jsonify({}), 200

    data = request.get_json()

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "Email already exists"}), 400

    user = User(
        name=data["name"],
        email=data["email"],
        role=data.get("role", "User")
    )
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User created"}), 201


# ---------- UPDATE USER ----------
@users_bp.route("/<int:user_id>", methods=["PUT", "OPTIONS"])
@jwt_required(optional=True)
def update_user(user_id):
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return jsonify({}), 200

    user = User.query.get_or_404(user_id)
    data = request.get_json()

    user.name = data["name"]
    user.email = data["email"]
    user.role = data.get("role", user.role)

    db.session.commit()
    return jsonify({"msg": "User updated"})


# ---------- DELETE USER ----------
@users_bp.route("/<int:user_id>", methods=["DELETE", "OPTIONS"])
@jwt_required(optional=True)
def delete_user(user_id):
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return jsonify({}), 200

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "User deleted"})
