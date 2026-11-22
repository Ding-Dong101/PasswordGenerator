import secrets
import string

UPPER = string.ascii_uppercase
LOWER = string.ascii_lowercase
DIGITS = string.digits
SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?"


def generate_password(length: int, uppercase: bool, lowercase: bool,
                      numbers: bool, symbols: bool) -> str:
    pools = []
    if uppercase:
        pools.append(UPPER)
    if lowercase:
        pools.append(LOWER)
    if numbers:
        pools.append(DIGITS)
    if symbols:
        pools.append(SYMBOLS)

    # Guarantee at least one character from every selected type...
    chars = [secrets.choice(pool) for pool in pools]
    # ...then fill the rest from the combined pool.
    combined = "".join(pools)
    chars += [secrets.choice(combined) for _ in range(length - len(chars))]

    # Cryptographically secure shuffle so the guaranteed characters aren't up front.
    secrets.SystemRandom().shuffle(chars)
    return "".join(chars)
