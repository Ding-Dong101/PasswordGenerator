import string


def rate_password(password: str) -> tuple[int, str]:
    """Return (score 1-4, label) from length and character variety."""
    kinds = sum([
        any(c in string.ascii_uppercase for c in password),
        any(c in string.ascii_lowercase for c in password),
        any(c in string.digits for c in password),
        any(not c.isalnum() for c in password),
    ])
    n = len(password)

    if n < 6 or kinds == 1 and n < 10:
        return 1, "TOO WEAK!"
    if n < 8 or kinds < 2:
        return 2, "WEAK"
    if n < 12 or kinds < 3:
        return 3, "MEDIUM"
    return 4, "STRONG"
