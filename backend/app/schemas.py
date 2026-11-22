from pydantic import BaseModel, Field, model_validator


class GenerateRequest(BaseModel):
    """What the frontend sends: length + which character types to include."""

    length: int = Field(default=12, ge=1, le=100)
    uppercase: bool = True
    lowercase: bool = True
    numbers: bool = True
    symbols: bool = False

    @model_validator(mode="after")
    def at_least_one_type(self):
        if not (self.uppercase or self.lowercase or self.numbers or self.symbols):
            raise ValueError("Select at least one character type.")
        if self.length < sum([self.uppercase, self.lowercase, self.numbers, self.symbols]):
            raise ValueError("Length is too short for the selected character types.")
        return self


class GenerateResponse(BaseModel):
    password: str
    score: int  # 1 (too weak) .. 4 (strong)
    label: str
