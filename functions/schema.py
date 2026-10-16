"""Structured shapes Claude fills in: the deck it writes, and the blind check of each question."""

from typing import List, Literal

from pydantic import BaseModel, Field

PartId = Literal["part1", "part2", "part3"]

# Domains from the IRS content outline for each part of the SEE. Kept in step with web/src/data/exam.ts.
DOMAINS: dict[str, dict[str, str]] = {
    "part1": {
        "p1d1": "Preliminary Work and Taxpayer Data",
        "p1d2": "Income and Assets",
        "p1d3": "Deductions and Credits",
        "p1d4": "Taxation",
        "p1d5": "Advising the Individual Taxpayer",
        "p1d6": "Specialized Returns for Individuals",
    },
    "part2": {
        "p2d1": "Business Entities and Considerations",
        "p2d2": "Business Tax Preparation",
        "p2d3": "Specialized Returns and Taxpayers",
    },
    "part3": {
        "p3d1": "Practices and Procedures",
        "p3d2": "Representation before the IRS",
        "p3d3": "Specific Areas of Representation",
        "p3d4": "Filing Process",
    },
}


class WrongOption(BaseModel):
    option: str = Field(description="A plausible but wrong answer, written like the right one so length doesn't give it away.")
    why_not: str = Field(description="One or two sentences on why this option is wrong.")


class Source(BaseModel):
    title: str = Field(description="The IRS page title, e.g. 'Publication 501, Dependents, Standard Deduction, and Filing Information'.")
    url: str = Field(description="A real page on https://www.irs.gov/ that supports the answer, e.g. https://www.irs.gov/publications/p501.")
    section: str = Field(description="The chapter, heading or line in that source, e.g. 'Filing Status: Head of Household'.")


class GeneratedQuestion(BaseModel):
    prompt: str = Field(description="The question as it would appear on the exam, with any facts needed to answer it.")
    domain: str = Field(description="The domain id from the content outline, e.g. 'p1d2'. Must belong to the deck's part.")
    topic: str = Field(description="A short topic label, e.g. 'Filing status' or 'Section 179'.")
    difficulty: Literal["Easy", "Medium", "Hard"]
    right_answer: str = Field(description="The single correct option.")
    wrong_options: List[WrongOption] = Field(description="Exactly three wrong options.")
    explanation: str = Field(
        description="Three paragraphs separated by a blank line: the rule; how it applies to these facts, showing "
        "the working for any calculation; and a line starting 'Exam tip:'."
    )
    source: Source


class GeneratedDeck(BaseModel):
    title: str = Field(description="A short deck title, e.g. 'Head of Household and Dependents'.")
    topics: List[str] = Field(description="2 to 5 sub-topics the deck covers.")
    questions: List[GeneratedQuestion]


class BlindAnswer(BaseModel):
    number: int = Field(description="The question number as given.")
    letter: Literal["A", "B", "C", "D"] = Field(description="The option you believe is correct.")
    single_best: bool = Field(description="True only if exactly one option is correct under tax law through Dec 31, 2025.")
    problem: str = Field(description="If single_best is false or the facts are ambiguous or outdated, say why. Otherwise ''.")


class BlindCheck(BaseModel):
    answers: List[BlindAnswer]
