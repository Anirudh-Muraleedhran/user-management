from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import User
from extensions import db

users_bp = Blueprint("users", __name__)

@users_bp.route("/", methods=["GET"])
@jwt_required()
def get_users():
    users = User.query.all()

    return jsonify([
        {
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role
        } for u in users
    ])


@users_bp.route("/", methods=["POST"])
@jwt_required()
def create_user():
    data = request.get_json()

    user = User(
        name=data["name"],
        email=data["email"],
        role=data.get("role", "User")
    )
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User created"}), 201
