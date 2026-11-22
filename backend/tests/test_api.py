import string
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def post(**over):
    body = dict(length=16, uppercase=True, lowercase=True, numbers=True, symbols=True)
    body.update(over)
    return client.post("/api/generate", json=body)


def test_health():
    assert client.get("/api/health").json() == {"status": "ok"}


def test_length_and_all_types():
    for _ in range(50):
        pw = post().json()["password"]
        assert len(pw) == 16
        assert any(c in string.ascii_uppercase for c in pw)
        assert any(c in string.ascii_lowercase for c in pw)
        assert any(c in string.digits for c in pw)
        assert any(not c.isalnum() for c in pw)


def test_numbers_only():
    pw = post(uppercase=False, lowercase=False, symbols=False, length=10).json()["password"]
    assert pw.isdigit() and len(pw) == 10


def test_no_types_rejected():
    assert post(uppercase=False, lowercase=False, numbers=False, symbols=False).status_code == 422


def test_bad_length_rejected():
    assert post(length=0).status_code == 422
    assert post(length=101).status_code == 422


def test_strength_fields():
    data = post(length=20).json()
    assert data["score"] == 4 and data["label"] == "STRONG"
