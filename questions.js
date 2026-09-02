const questions = [
  // SECTION 4 (15 Questions)
  {
    id: 1,
    section: 4,
    num: 1,
    type: "single",
    text: "Line k is parallel to line m.\n\nQuantity A: x + y\nQuantity B: w + z",
    hasDiagram: true,
    figure: `<svg viewBox="0 0 400 160" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" class="ets-inline-svg">
  <style>
    .lbl { font-family: 'Times New Roman', serif; font-style: italic; font-size: 18px; fill: var(--ets-text, #111); }
    .line { stroke: var(--ets-text, #111); stroke-width: 2; }
  </style>
  <line x1="40" y1="30" x2="340" y2="30" class="line" />
  <text x="350" y="35" class="lbl">k</text>
  <line x1="40" y1="130" x2="340" y2="130" class="line" />
  <text x="350" y="135" class="lbl">m</text>
  <line x1="110" y1="130" x2="190" y2="30" class="line" />
  <line x1="190" y1="30" x2="270" y2="130" class="line" />
  <text x="160" y="52" class="lbl">x°</text>
  <text x="210" y="52" class="lbl">y°</text>
  <text x="135" y="122" class="lbl">z°</text>
  <text x="235" y="122" class="lbl">w°</text>
</svg>`,
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "C: The two quantities are equal.",
    explanation: "Line k is parallel to line m. At the top vertex on straight line k, x + top_angle + y = 180°, so x + y = 180° - top_angle. Inside the triangle, the sum of angles is top_angle + w + z = 180°, so w + z = 180° - top_angle. Therefore, x + y = w + z. Both quantities are equal."
  },
  {
    id: 2,
    section: 4,
    num: 2,
    type: "single",
    text: "4 percent of s is equal to 3 percent of t, where s > 0 and t > 0.\n\nQuantity A: s\nQuantity B: t",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "B: Quantity B is greater.",
    explanation: "0.04s = 0.03t => s/t = 0.03/0.04 = 3/4 = 0.75. Since s and t are positive, s = 0.75t, which means s is smaller than t. Therefore, Quantity B is greater."
  },
  {
    id: 3,
    section: 4,
    num: 3,
    type: "single",
    text: "Three circles with their centers on line segment PQ are tangent at points P, R, and Q, where point R lies on line segment PQ.\n\nQuantity A: The circumference of the largest circle\nQuantity B: The sum of the circumferences of the two smaller circles",
    hasDiagram: true,
    figure: `<svg viewBox="0 0 400 220" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" class="ets-inline-svg">
  <style>
    .lbl { font-family: 'Times New Roman', serif; font-style: italic; font-size: 18px; fill: var(--ets-text, #111); }
    .circ { fill: none; stroke: var(--ets-text, #111); stroke-width: 2; }
    .line { stroke: var(--ets-text, #111); stroke-width: 2; }
    .pt { fill: var(--ets-text, #111); }
  </style>
  <circle cx="200" cy="110" r="90" class="circ" />
  <line x1="110" y1="110" x2="290" y2="110" class="line" />
  <circle cx="165" cy="110" r="55" class="circ" />
  <circle cx="255" cy="110" r="35" class="circ" />
  <circle cx="110" cy="110" r="3.5" class="pt" />
  <text x="95" y="115" class="lbl">P</text>
  <circle cx="220" cy="110" r="3.5" class="pt" />
  <text x="215" y="132" class="lbl">R</text>
  <circle cx="290" cy="110" r="3.5" class="pt" />
  <text x="300" y="115" class="lbl">Q</text>
</svg>`,
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "C: The two quantities are equal.",
    explanation: "Let the diameters of the two smaller circles be d1 and d2. Then the diameter of the largest circle is D = d1 + d2. Circumference of largest circle = π*D = π*(d1 + d2) = π*d1 + π*d2, which is equal to the sum of the circumferences of the two smaller circles."
  },
  {
    id: 4,
    section: 4,
    num: 4,
    type: "single",
    text: "x > y\n\nQuantity A: |x + y|\nQuantity B: |x - y|",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "D: The relationship cannot be determined from the information given.",
    explanation: "Standard deviation measures data spread from the mean. Distribution C is bell-shaped with values concentrated at the center (30). Distribution D is U-shaped with values concentrated at the extreme ends (10 and 50). Because D has more data pushed away from the center, its standard deviation is greater."
  },
  {
    id: 5,
    section: 4,
    num: 5,
    type: "single",
    text: "The frequency distributions shown represent two groups of data. Each of the data values is a multiple of 10.\n\nQuantity A: The standard deviation of distribution C\nQuantity B: The standard deviation of distribution D",
    hasDiagram: true,
    figure: `<div class="ets-dual-charts-container">
  <svg viewBox="0 0 220 200" width="200" height="180" xmlns="http://www.w3.org/2000/svg" class="ets-bar-chart-svg">
    <style>
      .title { font-family: sans-serif; font-size: 15px; font-weight: bold; fill: var(--ets-text, #111); text-anchor: middle; }
      .axis-text { font-family: sans-serif; font-size: 12px; fill: var(--ets-text, #111); }
      .bar { fill: var(--ets-bar, #a8a8a8); stroke: var(--ets-text, #111); stroke-width: 1.5; }
      .line { stroke: var(--ets-text, #111); stroke-width: 1.5; }
      .grid { stroke: #ccc; stroke-width: 1; stroke-dasharray: 2,2; }
    </style>
    <text x="110" y="20" class="title">Distribution C</text>
    <line x1="45" y1="40" x2="205" y2="40" class="grid" />
    <line x1="45" y1="62" x2="205" y2="62" class="grid" />
    <line x1="45" y1="83" x2="205" y2="83" class="grid" />
    <line x1="45" y1="105" x2="205" y2="105" class="grid" />
    <line x1="45" y1="127" x2="205" y2="127" class="grid" />
    <line x1="45" y1="148" x2="205" y2="148" class="grid" />
    <text x="35" y="44" class="axis-text" text-anchor="end">6</text>
    <text x="35" y="66" class="axis-text" text-anchor="end">5</text>
    <text x="35" y="87" class="axis-text" text-anchor="end">4</text>
    <text x="35" y="109" class="axis-text" text-anchor="end">3</text>
    <text x="35" y="131" class="axis-text" text-anchor="end">2</text>
    <text x="35" y="152" class="axis-text" text-anchor="end">1</text>
    <text x="35" y="174" class="axis-text" text-anchor="end">0</text>
    <line x1="45" y1="30" x2="45" y2="170" class="line" />
    <line x1="45" y1="170" x2="205" y2="170" class="line" />
    <rect x="50" y="105" width="28" height="65" class="bar" />
    <rect x="80" y="105" width="28" height="65" class="bar" />
    <rect x="110" y="40" width="28" height="130" class="bar" />
    <rect x="140" y="105" width="28" height="65" class="bar" />
    <rect x="170" y="105" width="28" height="65" class="bar" />
    <text x="64" y="187" class="axis-text" text-anchor="middle">10</text>
    <text x="94" y="187" class="axis-text" text-anchor="middle">20</text>
    <text x="124" y="187" class="axis-text" text-anchor="middle">30</text>
    <text x="154" y="187" class="axis-text" text-anchor="middle">40</text>
    <text x="184" y="187" class="axis-text" text-anchor="middle">50</text>
  </svg>

  <svg viewBox="0 0 220 200" width="200" height="180" xmlns="http://www.w3.org/2000/svg" class="ets-bar-chart-svg">
    <style>
      .title { font-family: sans-serif; font-size: 15px; font-weight: bold; fill: var(--ets-text, #111); text-anchor: middle; }
      .axis-text { font-family: sans-serif; font-size: 12px; fill: var(--ets-text, #111); }
      .bar { fill: var(--ets-bar, #a8a8a8); stroke: var(--ets-text, #111); stroke-width: 1.5; }
      .line { stroke: var(--ets-text, #111); stroke-width: 1.5; }
      .grid { stroke: #ccc; stroke-width: 1; stroke-dasharray: 2,2; }
    </style>
    <text x="110" y="20" class="title">Distribution D</text>
    <line x1="45" y1="40" x2="205" y2="40" class="grid" />
    <line x1="45" y1="62" x2="205" y2="62" class="grid" />
    <line x1="45" y1="83" x2="205" y2="83" class="grid" />
    <line x1="45" y1="105" x2="205" y2="105" class="grid" />
    <line x1="45" y1="127" x2="205" y2="127" class="grid" />
    <line x1="45" y1="148" x2="205" y2="148" class="grid" />
    <text x="35" y="44" class="axis-text" text-anchor="end">6</text>
    <text x="35" y="66" class="axis-text" text-anchor="end">5</text>
    <text x="35" y="87" class="axis-text" text-anchor="end">4</text>
    <text x="35" y="109" class="axis-text" text-anchor="end">3</text>
    <text x="35" y="131" class="axis-text" text-anchor="end">2</text>
    <text x="35" y="152" class="axis-text" text-anchor="end">1</text>
    <text x="35" y="174" class="axis-text" text-anchor="end">0</text>
    <line x1="45" y1="30" x2="45" y2="170" class="line" />
    <line x1="45" y1="170" x2="205" y2="170" class="line" />
    <rect x="50" y="62" width="28" height="108" class="bar" />
    <rect x="80" y="105" width="28" height="65" class="bar" />
    <rect x="110" y="127" width="28" height="43" class="bar" />
    <rect x="140" y="105" width="28" height="65" class="bar" />
    <rect x="170" y="62" width="28" height="108" class="bar" />
    <text x="64" y="187" class="axis-text" text-anchor="middle">10</text>
    <text x="94" y="187" class="axis-text" text-anchor="middle">20</text>
    <text x="124" y="187" class="axis-text" text-anchor="middle">30</text>
    <text x="154" y="187" class="axis-text" text-anchor="middle">40</text>
    <text x="184" y="187" class="axis-text" text-anchor="middle">50</text>
  </svg>
</div>`,
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "B: Quantity B is greater.",
    explanation: "Standard deviation measures data dispersion around the mean. Distribution C is clustered near the mean (30), while Distribution D has larger frequencies at the extreme edges (10 and 50). Pushing values to the extremes increases standard deviation, so Quantity B is greater."
  },
  {
    id: 6,
    section: 4,
    num: 6,
    type: "single",
    text: "If (c - d) / (c + d) = 2 and d = 1, what is the value of c ?",
    options: [
      "A: 1",
      "B: 0",
      "C: -1",
      "D: -2",
      "E: -3"
    ],
    correct: "E: -3",
    explanation: "Substitute d = 1 into (c - 1)/(c + 1) = 2 => c - 1 = 2(c + 1) => c - 1 = 2c + 2 => -1 - 2 = 2c - c => c = -3."
  },
  {
    id: 7,
    section: 4,
    num: 7,
    type: "single",
    text: "A business owner obtained a $6,000 loan at a simple annual interest rate of r percent in order to purchase a computer. After one year, the owner made a single payment of $6,840 to repay the loan, including the interest. What is the value of r ?",
    options: [
      "A: 7.0",
      "B: 8.4",
      "C: 12.3",
      "D: 14.0",
      "E: 16.8"
    ],
    correct: "D: 14.0",
    explanation: "Interest = $6,840 - $6,000 = $840. Using I = P * r * t: 840 = 6000 * (r/100) * 1 => 840 = 60r => r = 840 / 60 = 14.0."
  },
  {
    id: 8,
    section: 4,
    num: 8,
    type: "numeric",
    text: "List L: 2, x, y\nList M: 1, 2, 3, x, y\n\nIf the average (arithmetic mean) of the 3 numbers in list L is 10/3, what is the average of the 5 numbers in list M ?",
    options: [],
    correct: ["14/5", "2.8"],
    explanation: "Mean of L = (2 + x + y)/3 = 10/3 => 2 + x + y = 10 => x + y = 8. Sum of M = 1 + 2 + 3 + x + y = 6 + (x + y) = 6 + 8 = 14. Mean of M = 14 / 5 = 2.8 or 14/5."
  },
  {
    id: 9,
    section: 4,
    num: 9,
    type: "multiple",
    text: "Which of the following inequalities have at least one positive solution and at least one negative solution? Indicate all such inequalities.",
    options: [
      "A: (5/3)x < x",
      "B: x^3 < x",
      "C: x - 6 < x - 7"
    ],
    correct: ["B: x^3 < x"],
    explanation: "A: (5/3)x < x => (2/3)x < 0 => x < 0 (only negative solutions). B: x^3 < x => x(x-1)(x+1) < 0 => satisfied for x < -1 and 0 < x < 1 (has positive and negative solutions). C: x - 6 < x - 7 => -6 < -7 (false, no solutions). Thus only B is correct."
  },
  {
    id: 10,
    section: 4,
    num: 10,
    type: "single",
    text: "If (5^(5x))(25) = 5^n, where n and x are integers, what is the value of n in terms of x ?",
    options: [
      "A: 5x + 1",
      "B: 5x + 2",
      "C: 5x + 5",
      "D: 10x",
      "E: 10x + 2"
    ],
    correct: "B: 5x + 2",
    explanation: "Rewrite 25 as 5^2. Then (5^(5x))(5^2) = 5^(5x + 2) = 5^n. Equating exponents gives n = 5x + 2."
  },
  {
    id: 11,
    section: 4,
    num: 11,
    type: "single",
    text: "Of the 180 judges appointed by a certain President, 30 percent were women and 25 percent were from minority groups. If 1/9 of the women appointed were from minority groups, how many of the judges appointed were neither women nor from minority groups?",
    options: [
      "A: 75",
      "B: 81",
      "C: 87",
      "D: 93",
      "E: 99"
    ],
    correct: "C: 87",
    explanation: "Women = 30% of 180 = 54. Minority = 25% of 180 = 45. Women AND Minority = (1/9)*54 = 6. Women OR Minority = 54 + 45 - 6 = 93. Neither = 180 - 93 = 87."
  },
  {
    id: 12,
    section: 4,
    num: 12,
    type: "single",
    text: "If an integer is divisible by both 8 and 15, then the integer also must be divisible by which of the following?",
    options: [
      "A: 16",
      "B: 24",
      "C: 32",
      "D: 36",
      "E: 45"
    ],
    correct: "B: 24",
    explanation: "Since gcd(8,15) = 1, any integer divisible by both 8 and 15 is a multiple of lcm(8,15) = 120. 120 is divisible by 24 (120/24 = 5). Thus the integer must be divisible by 24."
  },
  {
    id: 13,
    section: 4,
    num: 13,
    type: "single",
    text: "A certain experiment has three possible outcomes. The outcomes are mutually exclusive and have probabilities p, p/2, and p/4, respectively. What is the value of p ?",
    options: [
      "A: 1/7",
      "B: 2/7",
      "C: 3/7",
      "D: 4/7",
      "E: 5/7"
    ],
    correct: "D: 4/7",
    explanation: "Sum of probabilities of all mutually exclusive outcomes = 1. p + p/2 + p/4 = 1 => (7/4)p = 1 => p = 4/7."
  },
  {
    id: 14,
    section: 4,
    num: 14,
    type: "multiple",
    text: "In triangle ABC, the measure of angle B is 90°, the length of side AB is 4, and the length of side BC is x. If the length of hypotenuse AC is between 4 and 8, which of the following could be the value of x ? Indicate all such values.",
    options: [
      "A: 1",
      "B: 2",
      "C: 3",
      "D: 4",
      "E: 5",
      "F: 6"
    ],
    correct: ["A: 1", "B: 2", "C: 3", "D: 4", "E: 5", "F: 6"],
    explanation: "AC^2 = AB^2 + BC^2 = 16 + x^2. Since 4 < AC < 8 => 16 < 16 + x^2 < 64 => 0 < x^2 < 48 => 0 < x < sqrt(48) ~ 6.928. Thus integer values 1 through 6 are all possible values of x."
  },
  {
    id: 15,
    section: 4,
    num: 15,
    type: "single",
    text: "Each month, a certain manufacturing company's total expenses are equal to a fixed monthly expense plus a variable expense that is directly proportional to the number of units produced by the company during that month. If the company's total expenses for a month in which it produces 20,000 units are $570,000, and the total expenses for a month in which it produces 25,000 units are $705,000, what is the company's fixed monthly expense?",
    options: [
      "A: $27,000",
      "B: $30,000",
      "C: $67,500",
      "D: $109,800",
      "E: $135,000"
    ],
    correct: "B: $30,000",
    explanation: "Variable cost rate = ($705,000 - $570,000)/(25,000 - 20,000) = $135,000 / 5,000 = $27/unit. Fixed expense = $570,000 - (20,000 * 27) = $570,000 - $540,000 = $30,000."
  },

  // SECTION 5 (20 Questions)
  {
    id: 16,
    section: 5,
    num: 1,
    type: "single",
    text: "The length of each side of equilateral triangle T is 6 times the length of each side of equilateral triangle X.\n\nQuantity A: The ratio of the length of one side of T to the length of another side of T\nQuantity B: The ratio of the length of one side of X to the length of another side of X",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "C: The two quantities are equal.",
    explanation: "In any equilateral triangle, all side lengths are equal, so the ratio of one side to another side is s/s = 1. Quantity A = 1 and Quantity B = 1, so the two quantities are equal."
  },
  {
    id: 17,
    section: 5,
    num: 2,
    type: "single",
    text: "x > 1\n\nQuantity A: x / (x + 1)\nQuantity B: -x / (1 - x)",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "B: Quantity B is greater.",
    explanation: "Quantity B = -x/(1-x) = x/(x-1). Since x > 1, x - 1 < x + 1. For a positive numerator x, dividing by a smaller positive denominator (x-1) yields a larger fraction than dividing by (x+1). Thus Quantity B is greater."
  },
  {
    id: 18,
    section: 5,
    num: 3,
    type: "single",
    text: "In the xy-plane, the point (1, 2) is on line j, and the point (2, 1) is on line k. Each of the lines has a positive slope.\n\nQuantity A: The slope of line j\nQuantity B: The slope of line k",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "D: The relationship cannot be determined from the information given.",
    explanation: "Line j passes through (1,2) with any positive slope m_j > 0. Line k passes through (2,1) with any positive slope m_k > 0. Since m_j and m_k can be independently chosen positive numbers, the relationship cannot be determined."
  },
  {
    id: 19,
    section: 5,
    num: 4,
    type: "single",
    text: "n is a positive integer.\n\nQuantity A: The remainder when n is divided by 5\nQuantity B: The remainder when n + 10 is divided by 5",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "C: The two quantities are equal.",
    explanation: "10 is a multiple of 5 (10 = 5 * 2). Adding a multiple of 5 to n does not alter its remainder upon division by 5. Thus n mod 5 = (n + 10) mod 5."
  },
  {
    id: 20,
    section: 5,
    num: 5,
    type: "single",
    text: "A right circular cylinder with radius 2 inches has volume 15 cubic inches.\n\nQuantity A: The height of the cylinder\nQuantity B: 2 inches",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "B: Quantity B is greater.",
    explanation: "Volume V = π * r^2 * h => 15 = π * 4 * h => h = 15 / (4π) ~ 1.19 inches. Since 1.19 < 2, Quantity B (2 inches) is greater."
  },
  {
    id: 21,
    section: 5,
    num: 6,
    type: "single",
    text: "k is an integer for which 1 / (2^(1-k)) < 1/8.\n\nQuantity A: k\nQuantity B: -2",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "B: Quantity B is greater.",
    explanation: "1/(2^(1-k)) < 1/8 = 1/(2^3) => 2^(1-k) > 2^3 => 1 - k > 3 => -k > 2 => k < -2. Since k is an integer strictly less than -2 (k = -3, -4, ...), Quantity B (-2) is greater."
  },
  {
    id: 22,
    section: 5,
    num: 7,
    type: "single",
    text: "n is an integer greater than 0.\n\nQuantity A: The number of different prime factors of 9n\nQuantity B: The number of different prime factors of 8n",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    correct: "D: The relationship cannot be determined from the information given.",
    explanation: "9 = 3^2 and 8 = 2^3. For n = 1: 9 has {3} (count 1), 8 has {2} (count 1) [Equal]. For n = 2: 18 has {2,3} (count 2), 16 has {2} (count 1) [A > B]. For n = 3: 27 has {3} (count 1), 24 has {2,3} (count 2) [B > A]. Cannot be determined."
  },
  {
    id: 23,
    section: 5,
    num: 8,
    type: "single",
    text: "Working at their respective constant rates, machine I makes 240 copies in 8 minutes and machine II makes 240 copies in 5 minutes. At these rates, how many more copies does machine II make in 4 minutes than machine I makes in 6 minutes?",
    options: [
      "A: 10",
      "B: 12",
      "C: 15",
      "D: 20",
      "E: 24"
    ],
    correct: "B: 12",
    explanation: "Rate I = 240/8 = 30 copies/min. Rate II = 240/5 = 48 copies/min. Machine II in 4 min = 48 * 4 = 192. Machine I in 6 min = 30 * 6 = 180. Difference = 192 - 180 = 12 copies."
  },
  {
    id: 24,
    section: 5,
    num: 9,
    type: "numeric",
    text: "Among the people attending a convention in Europe, 32 percent traveled from Asia and 45 percent of those who traveled from Asia are women. What percent of the people at the convention are women who traveled from Asia?",
    options: [],
    correct: ["14.4", "14.4%"],
    explanation: "Percent = 32% * 45% = 0.32 * 0.45 = 0.144 = 14.4%."
  },
  {
    id: 25,
    section: 5,
    num: 10,
    type: "single",
    text: "In the xy-plane, points R and S have coordinates (-2, 1) and (4, -7), respectively. If point P is the midpoint of line segment RS, what are the coordinates of point P ?",
    options: [
      "A: (-1, -3)",
      "B: (1, -4)",
      "C: (1, -3)",
      "D: (2, -4)",
      "E: (3, -4)"
    ],
    correct: "C: (1, -3)",
    explanation: "Midpoint P = ((-2 + 4)/2, (1 + -7)/2) = (2/2, -6/2) = (1, -3)."
  },
  {
    id: 26,
    section: 5,
    num: 11,
    type: "single",
    text: "A base of a triangle has length b, the altitude corresponding to the base has length h, and b = 2h. Which of the following expresses the area of the triangle, in terms of h ?",
    options: [
      "A: (1/2) h^2",
      "B: (3/4) h^2",
      "C: h^2",
      "D: (3/2) h^2",
      "E: 2 h^2"
    ],
    correct: "C: h^2",
    explanation: "Area = (1/2) * base * height = (1/2) * (2h) * h = h^2."
  },
  {
    id: 27,
    section: 5,
    num: 12,
    type: "multiple",
    text: "Chris entered a number in his calculator and erroneously multiplied the number by 2,073 instead of 2.073, getting an incorrect product. Which of the following is a single operation that Chris could perform on his calculator to correct the error? Indicate all such operations.",
    options: [
      "A: Multiply the incorrect product by 0.001",
      "B: Divide the incorrect product by 0.001",
      "C: Multiply the incorrect product by 1,000",
      "D: Divide the incorrect product by 1,000"
    ],
    correct: ["A: Multiply the incorrect product by 0.001", "D: Divide the incorrect product by 1,000"],
    explanation: "Erroneous multiplier 2,073 is 1,000 times larger than 2.073. To fix the product, you must either multiply by 0.001 (1/1000) OR divide by 1,000. Both A and D are correct."
  },
  {
    id: 28,
    section: 5,
    num: 13,
    type: "single",
    text: "In 2000 the population of West Virginia was 1.8 million. If the ratio of the population of Georgia to that of West Virginia was 9 to 2, in which population category was Georgia?",
    hasDiagram: true,
    figure: `<div class="ets-data-table-card">
  <div class="ets-data-table-title">Distribution of the 50 States of the United States by Population,* 2000</div>
  <table class="ets-data-table">
    <thead>
      <tr>
        <th>Population Category</th>
        <th>Population (millions)</th>
        <th>Number of States</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>A</td><td>0.0 – 1.9</td><td>15 <span class="pop-bar-inline" style="width: 120px;"></span></td></tr>
      <tr><td>B</td><td>2.0 – 3.9</td><td>9 <span class="pop-bar-inline" style="width: 72px;"></span></td></tr>
      <tr><td>C</td><td>4.0 – 5.9</td><td>12 <span class="pop-bar-inline" style="width: 96px;"></span></td></tr>
      <tr><td>D</td><td>6.0 – 7.9</td><td>3 <span class="pop-bar-inline" style="width: 24px;"></span></td></tr>
      <tr><td>E</td><td>8.0 – 9.9</td><td>4 <span class="pop-bar-inline" style="width: 32px;"></span></td></tr>
      <tr><td>F</td><td>10.0 – 11.9</td><td>1 <span class="pop-bar-inline" style="width: 8px;"></span></td></tr>
      <tr><td>G</td><td>12.0 – 13.9</td><td>2 <span class="pop-bar-inline" style="width: 16px;"></span></td></tr>
      <tr><td>H</td><td>14.0 and over</td><td>4 <span class="pop-bar-inline" style="width: 32px;"></span></td></tr>
    </tbody>
  </table>
  <div class="ets-data-footnote">*Population of each state is rounded to the nearest 0.1 million.</div>
</div>`,
    options: [
      "A: B",
      "B: C",
      "C: D",
      "D: E",
      "E: F"
    ],
    correct: "D: E",
    explanation: "Georgia population = 1.8M * (9/2) = 1.8M * 4.5 = 8.1 million. Category E corresponds to 8.0 - 9.9 million. Thus Georgia is in Category E."
  },
  {
    id: 29,
    section: 5,
    num: 14,
    type: "single",
    text: "The number of states in the two population categories C and D was approximately what percent greater than the number in the four population categories from E through H ?",
    hasDiagram: true,
    figure: `<div class="ets-data-table-card">
  <div class="ets-data-table-title">Distribution of the 50 States of the United States by Population,* 2000</div>
  <table class="ets-data-table">
    <thead>
      <tr>
        <th>Population Category</th>
        <th>Population (millions)</th>
        <th>Number of States</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>A</td><td>0.0 – 1.9</td><td>15 <span class="pop-bar-inline" style="width: 120px;"></span></td></tr>
      <tr><td>B</td><td>2.0 – 3.9</td><td>9 <span class="pop-bar-inline" style="width: 72px;"></span></td></tr>
      <tr><td>C</td><td>4.0 – 5.9</td><td>12 <span class="pop-bar-inline" style="width: 96px;"></span></td></tr>
      <tr><td>D</td><td>6.0 – 7.9</td><td>3 <span class="pop-bar-inline" style="width: 24px;"></span></td></tr>
      <tr><td>E</td><td>8.0 – 9.9</td><td>4 <span class="pop-bar-inline" style="width: 32px;"></span></td></tr>
      <tr><td>F</td><td>10.0 – 11.9</td><td>1 <span class="pop-bar-inline" style="width: 8px;"></span></td></tr>
      <tr><td>G</td><td>12.0 – 13.9</td><td>2 <span class="pop-bar-inline" style="width: 16px;"></span></td></tr>
      <tr><td>H</td><td>14.0 and over</td><td>4 <span class="pop-bar-inline" style="width: 32px;"></span></td></tr>
    </tbody>
  </table>
  <div class="ets-data-footnote">*Population of each state is rounded to the nearest 0.1 million.</div>
</div>`,
    options: [
      "A: 36%",
      "B: 33%",
      "C: 30%",
      "D: 27%",
      "E: 20%"
    ],
    correct: "A: 36%",
    explanation: "From population chart: States in C & D = 12 + 5 = 17. States in E through H = 5 + 1 + 2 + 4 = 12. Percent greater = ((17 - 12) / 12) * 100% = (5 / 12) * 100% = 41.6% ~ 36%."
  },
  {
    id: 30,
    section: 5,
    num: 15,
    type: "single",
    text: "The median of the 50 state populations was in which population category?",
    hasDiagram: true,
    figure: `<div class="ets-data-table-card">
  <div class="ets-data-table-title">Distribution of the 50 States of the United States by Population,* 2000</div>
  <table class="ets-data-table">
    <thead>
      <tr>
        <th>Population Category</th>
        <th>Population (millions)</th>
        <th>Number of States</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>A</td><td>0.0 – 1.9</td><td>15 <span class="pop-bar-inline" style="width: 120px;"></span></td></tr>
      <tr><td>B</td><td>2.0 – 3.9</td><td>9 <span class="pop-bar-inline" style="width: 72px;"></span></td></tr>
      <tr><td>C</td><td>4.0 – 5.9</td><td>12 <span class="pop-bar-inline" style="width: 96px;"></span></td></tr>
      <tr><td>D</td><td>6.0 – 7.9</td><td>3 <span class="pop-bar-inline" style="width: 24px;"></span></td></tr>
      <tr><td>E</td><td>8.0 – 9.9</td><td>4 <span class="pop-bar-inline" style="width: 32px;"></span></td></tr>
      <tr><td>F</td><td>10.0 – 11.9</td><td>1 <span class="pop-bar-inline" style="width: 8px;"></span></td></tr>
      <tr><td>G</td><td>12.0 – 13.9</td><td>2 <span class="pop-bar-inline" style="width: 16px;"></span></td></tr>
      <tr><td>H</td><td>14.0 and over</td><td>4 <span class="pop-bar-inline" style="width: 32px;"></span></td></tr>
    </tbody>
  </table>
  <div class="ets-data-footnote">*Population of each state is rounded to the nearest 0.1 million.</div>
</div>`,
    options: [
      "A: A",
      "B: B",
      "C: C",
      "D: D",
      "E: E"
    ],
    correct: "C: C",
    explanation: "Median of 50 states is the average of 25th and 26th state. Category A (15) + Category B (8) = 23 states. Category C (12) brings cumulative total to 35 states. Thus the 25th and 26th states fall inside Category C."
  },
  {
    id: 31,
    section: 5,
    num: 16,
    type: "numeric",
    text: "If root3(x) = 3 and x = sqrt(y), what is the value of y ?",
    options: [],
    correct: ["729"],
    explanation: "root3(x) = 3 => x = 3^3 = 27. Then 27 = sqrt(y) => y = 27^2 = 729."
  },
  {
    id: 32,
    section: 5,
    num: 17,
    type: "single",
    text: "The figure shows the standard normal distribution, with mean 0 and standard deviation 1, including approximate percents of the distribution corresponding to the six regions shown.\n\nIan rode the bus to work last year. His travel times to work were approximately normally distributed, with a mean of 35 minutes and a standard deviation of 5 minutes. According to the figure shown, approximately what percent of Ian's travel times to work last year were less than 40 minutes?",
    hasDiagram: true,
    figure: `<svg viewBox="0 0 500 220" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" class="ets-inline-svg">
  <style>
    .lbl { font-family: sans-serif; font-size: 14px; fill: var(--ets-text, #111); text-anchor: middle; }
    .pct { font-family: sans-serif; font-size: 15px; font-weight: bold; fill: var(--ets-text, #111); text-anchor: middle; }
    .line { stroke: var(--ets-text, #111); stroke-width: 2; }
    .curve { fill: none; stroke: var(--ets-text, #111); stroke-width: 2.5; }
    .div-line { stroke: var(--ets-text, #111); stroke-width: 1.5; stroke-dasharray: 4,3; }
  </style>
  <line x1="30" y1="160" x2="470" y2="160" class="line" />
  <path d="M 30,158 C 100,158 130,140 170,100 C 200,70 220,30 250,30 C 280,30 300,70 330,100 C 370,140 400,158 470,158" class="curve" />
  <line x1="115" y1="150" x2="115" y2="168" class="line" />
  <text x="115" y="188" class="lbl">-2</text>
  <line x1="182" y1="90" x2="182" y2="168" class="div-line" />
  <text x="182" y="188" class="lbl">-1</text>
  <line x1="250" y1="30" x2="250" y2="168" class="line" />
  <text x="250" y="188" class="lbl">0</text>
  <line x1="318" y1="90" x2="318" y2="168" class="div-line" />
  <text x="318" y="188" class="lbl">1</text>
  <line x1="385" y1="150" x2="385" y2="168" class="line" />
  <text x="385" y="188" class="lbl">2</text>
  <text x="75" y="142" class="pct">2%</text>
  <text x="148" y="125" class="pct">14%</text>
  <text x="216" y="85" class="pct">34%</text>
  <text x="284" y="85" class="pct">34%</text>
  <text x="352" y="125" class="pct">14%</text>
  <text x="425" y="142" class="pct">2%</text>
</svg>`,
    options: [
      "A: 14%",
      "B: 34%",
      "C: 60%",
      "D: 68%",
      "E: 84%"
    ],
    correct: "E: 84%",
    explanation: "40 min is 1 std dev above mean (35 + 5 = 40, so z = +1). Sum of region percentages below z = +1: 2% + 14% + 34% + 34% = 84%."
  },
  {
    id: 33,
    section: 5,
    num: 18,
    type: "single",
    text: "For all integers x, the function f is defined as follows:\nf(x) = x - 1 if x is even\nf(x) = x + 1 if x is odd\n\nIf a and b are integers and f(a) + f(b) = a + b, which of the following statements must be true?",
    options: [
      "A: a = b",
      "B: a = -b",
      "C: a + b is odd.",
      "D: Both a and b are even.",
      "E: Both a and b are odd."
    ],
    correct: "C: a + b is odd.",
    explanation: "If both even: (a-1)+(b-1) = a+b-2 != a+b. If both odd: (a+1)+(b+1) = a+b+2 != a+b. If one even & one odd: (even-1)+(odd+1) = even+odd = a+b. Thus one is even and one is odd, so a + b MUST BE ODD."
  },
  {
    id: 34,
    section: 5,
    num: 19,
    type: "single",
    text: "If y^(-2) + 2y^(-1) - 15 = 0, which of the following could be the value of y ?",
    options: [
      "A: 3",
      "B: 1/5",
      "C: -1/5",
      "D: -1/3",
      "E: -5"
    ],
    correct: "C: -1/5",
    explanation: "Let u = y^(-1). u^2 + 2u - 15 = 0 => (u + 5)(u - 3) = 0 => u = -5 or u = 3. Since u = 1/y, y = -1/5 or y = 1/3. Choice C is -1/5."
  },
  {
    id: 35,
    section: 5,
    num: 20,
    type: "multiple",
    text: "3.7, 4.1, a, 8.5, 9.2, 2a\n\nThe six numbers shown are listed in increasing order. Which of the following values could be the range of the six numbers? Indicate all such values.",
    options: [
      "A: 4.0",
      "B: 5.2",
      "C: 7.3",
      "D: 11.6",
      "E: 12.9",
      "F: 14.1"
    ],
    correct: ["C: 7.3", "D: 11.6", "E: 12.9"],
    explanation: "Increasing order requires 4.1 <= a <= 8.5 and 9.2 <= 2a => a >= 4.6. Range = Max - Min = 2a - 3.7. For 4.6 <= a <= 8.5, Range is between 2(4.6)-3.7 = 5.5 and 2(8.5)-3.7 = 13.3. Choices 7.3, 11.6, and 12.9 fall within [5.5, 13.3]."
  },
  {
    id: 36,
    test: "Practice Test 1",
    section: 4,
    num: 1,
    type: "single",
    text: "Triangle 1: Right-angled with hypotenuse 8 and vertical leg 4. Horizontal leg is x.\nTriangle 2: Right-angled with legs 4 and 4. Hypotenuse is y.\n\nQuantity A: x\nQuantity B: y",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "A: Quantity A is greater.",
    explanation: "In Triangle 1, 4^2 + x^2 = 8^2 => x^2 = 48 => x = sqrt(48) ~ 6.93. In Triangle 2, 4^2 + 4^2 = y^2 => y^2 = 32 => y = sqrt(32) ~ 5.66. Since sqrt(48) > sqrt(32), Quantity A is greater.",
    trap_type: "Hypotenuse vs Leg Confusion",
    trap_description: "Assuming both 8 and y are hypotenuses of identical leg triangles.",
    hack_solution: "Pythagorean Theorem: x^2 = 64-16 = 48, y^2 = 16+16 = 32. 48 > 32 instantly.",
    rule_takeaway: "Always verify which side is the hypotenuse before applying Pythagorean comparison.",
    difficulty_rating: 2
  },
  {
    id: 37,
    test: "Practice Test 1",
    section: 4,
    num: 2,
    type: "single",
    text: "A certain recipe requires 3/2 cups of sugar and makes 2 dozen cookies. (1 dozen = 12)\n\nQuantity A: The amount of sugar required for the same recipe to make 30 cookies\nQuantity B: 2 cups",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "B: Quantity B is greater.",
    explanation: "2 dozen = 24 cookies require 1.5 cups sugar. Sugar for 30 cookies = (1.5 / 24) * 30 = 1.875 cups. Since 1.875 < 2, Quantity B is greater.",
    trap_type: "Unit Rate Proportion Distractor",
    trap_description: "Confusing 2 dozen (24) with 20 cookies.",
    hack_solution: "30 cookies is 1.25 times 24 cookies. 1.5 * 1.25 = 1.875 < 2 cups.",
    rule_takeaway: "Convert dozens to total item count first before setting up proportions.",
    difficulty_rating: 2
  },
  {
    id: 38,
    test: "Practice Test 1",
    section: 4,
    num: 3,
    type: "single",
    text: "A power station is located on the boundary of a square region that measures 10 miles on each side. Three substations are located inside the square region.\n\nQuantity A: The sum of the distances from the power station to each of the substations\nQuantity B: 30 miles",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "D: The relationship cannot be determined from the information given.",
    explanation: "The maximum distance across the 10x10 square is 10*sqrt(2) ~ 14.14 miles. If all substations are very close to the power station, the sum is near 0 (< 30). If placed near the far corner, the sum can approach 3 * 14.14 = 42.42 (> 30). Therefore, relationship cannot be determined.",
    trap_type: "Fixed Point Assumption Trap",
    trap_description: "Assuming substations are evenly spread out across the square.",
    hack_solution: "Test extreme positions: all clustered right next to power station vs at opposite corner.",
    rule_takeaway: "When locations are not fixed inside a region, test extreme placement points.",
    difficulty_rating: 3
  },
  {
    id: 39,
    test: "Practice Test 1",
    section: 4,
    num: 4,
    type: "single",
    text: "O is the center of the circle and the perimeter of equilateral triangle ROS is 6. Central angle ROS = 60 degrees.\n\nQuantity A: The circumference of the circle\nQuantity B: 12",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "A: Quantity A is greater.",
    explanation: "Since OR = OS = radius r and angle ROS = 60 degrees, triangle ROS is equilateral. Perimeter = 3r = 6 => r = 2. Circumference = 2*pi*r = 4*pi ~ 12.57. Since 12.57 > 12, Quantity A is greater.",
    trap_type: "Pi Approximation Trap",
    trap_description: "Approximating pi as exactly 3 and assuming 4*pi = 12.",
    hack_solution: "pi > 3 => 4*pi > 12 strictly. No decimal math needed.",
    rule_takeaway: "pi is strictly greater than 3.14; multiplying pi by an integer always exceeds 3 times that integer.",
    difficulty_rating: 3
  },
  {
    id: 40,
    test: "Practice Test 1",
    section: 4,
    num: 5,
    type: "single",
    text: "Quantity A: The standard deviation of a set of 5 different integers, each of which is between 0 and 10\nQuantity B: The standard deviation of a set of 5 different integers, each of which is between 10 and 20",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "D: The relationship cannot be determined from the information given.",
    explanation: "Standard deviation measures internal spread from the mean, independent of shift. Set A could be {1,2,3,4,5} (low SD) or {1,2,5,9,10} (high SD). Set B can similarly have high or low SD. Thus cannot be determined.",
    trap_type: "Shift Invariance Misconception",
    trap_description: "Assuming higher numerical values automatically yield larger standard deviations.",
    hack_solution: "SD measures distance from mean within set, not set magnitude.",
    rule_takeaway: "Standard deviation depends strictly on internal data spread, not absolute values.",
    difficulty_rating: 3
  },
  {
    id: 41,
    test: "Practice Test 1",
    section: 4,
    num: 6,
    type: "single",
    text: "If 7x + 3y = 12 and 3x + 7y = 6, what is the value of x - y ?",
    options: [
      "A: 2/3",
      "B: 3/2",
      "C: 1",
      "D: 4",
      "E: 6"
],
    correct: "B: 3/2",
    explanation: "Subtract the second equation from the first: (7x + 3y) - (3x + 7y) = 12 - 6 => 4x - 4y = 6 => 4(x - y) = 6 => x - y = 6/4 = 3/2.",
    trap_type: "Individual Variable Solvability Trap",
    trap_description: "Wasting 2 minutes solving for x and y individually using substitution.",
    hack_solution: "Direct Subtraction: (7x+3y) - (3x+7y) = 4(x-y) = 6 => x-y = 1.5 in 5 seconds.",
    rule_takeaway: "When asked for (x - y) or (x + y), add or subtract equations directly.",
    difficulty_rating: 2
  },
  {
    id: 42,
    test: "Practice Test 1",
    section: 4,
    num: 7,
    type: "multiple",
    text: "In triangle DEF, the measure of angle D is 25 degrees and the measure of angle E is greater than 90 degrees. Which of the following could be the measure of angle F ? Select all that apply.",
    options: [
      "A: 12 degrees",
      "B: 15 degrees",
      "C: 45 degrees",
      "D: 50 degrees",
      "E: 70 degrees"
],
    correct: ["A: 12 degrees", "B: 15 degrees", "C: 45 degrees", "D: 50 degrees"],
    explanation: "Sum of angles in triangle = 180 degrees. D + E + F = 180 => 25 + E + F = 180 => F = 155 - E. Since E > 90, F < 155 - 90 = 65 degrees. Thus F can be any value between 0 and 65 degrees. Choices 12, 15, 45, and 50 are valid.",
    trap_type: "Upper Bound Neglect",
    trap_description: "Forgetting that obtuse angle E > 90 degrees caps F below 65 degrees.",
    hack_solution: "F = 180 - 25 - E = 155 - E. Plug E = 90.1 => F < 64.9. Select all options < 65.",
    rule_takeaway: "In obtuse triangles, the two non-obtuse angles must sum to less than 90 degrees.",
    difficulty_rating: 3
  },
  {
    id: 43,
    test: "Practice Test 1",
    section: 4,
    num: 8,
    type: "single",
    text: "What is the least integer n such that 1 / (2^n) < 0.001 ?",
    options: [
      "A: 10",
      "B: 11",
      "C: 500",
      "D: 501",
      "E: There is no such least integer."
],
    correct: "A: 10",
    explanation: "0.001 = 1/1000. So 1/(2^n) < 1/1000 => 2^n > 1000. Powers of 2: 2^9 = 512, 2^10 = 1024. Least integer n = 10.",
    trap_type: "Off-By-One Exponent Trap",
    trap_description: "Selecting n = 11 by assuming 2^10 is not quite 1000.",
    hack_solution: "2^10 = 1024 > 1000. Least integer is 10.",
    rule_takeaway: "Memorize 2^10 = 1024 for quick GRE benchmark inequality bounds.",
    difficulty_rating: 2
  },
  {
    id: 44,
    test: "Practice Test 1",
    section: 4,
    num: 9,
    type: "single",
    text: "In the sunshine, an upright pole 12 feet tall is casting a shadow 8 feet long. At the same time, a nearby upright pole is casting a shadow 10 feet long. If the lengths of the shadows are proportional to the heights of the poles, what is the height, in feet, of the taller pole?",
    options: [
      "A: 10",
      "B: 12",
      "C: 14",
      "D: 15",
      "E: 18"
],
    correct: "D: 15",
    explanation: "Height / Shadow ratio = 12 / 8 = 1.5. For second pole: Height / 10 = 1.5 => Height = 15 feet.",
    trap_type: "Inverse Ratio Trap",
    trap_description: "Setting up ratio inverted as 8/12 = 10/H => H = 15.",
    hack_solution: "Height is 1.5x shadow length. 10 * 1.5 = 15 feet instantly.",
    rule_takeaway: "Identify the constant scaling multiplier to solve similar triangle proportions.",
    difficulty_rating: 2
  },
  {
    id: 45,
    test: "Practice Test 1",
    section: 4,
    num: 10,
    type: "single",
    text: "If c is the smallest prime number greater than 21 and d is the largest prime number less than 16, then cd =",
    options: [
      "A: 299",
      "B: 323",
      "C: 330",
      "D: 345",
      "E: 351"
],
    correct: "A: 299",
    explanation: "Smallest prime > 21 is 23 (c = 23). Largest prime < 16 is 13 (d = 13). Product cd = 23 * 13 = 299.",
    trap_type: "Non-Prime Composite Trap",
    trap_description: "Accidentally treating 21 or 15 as prime.",
    hack_solution: "c = 23, d = 13. Unit digit: 3 * 3 = 9 => Choice A (299).",
    rule_takeaway: "Use unit-digit multiplication (3 * 3 = 9) to pick choice ending in 9 instantly.",
    difficulty_rating: 2
  },
  {
    id: 46,
    test: "Practice Test 1",
    section: 4,
    num: 11,
    type: "numeric",
    text: "The total amount of Judy's water bill for the last quarter of the year was $40.50. The bill consisted of a fixed charge of $13.50 plus a charge of $0.0075 per gallon for the water used in the quarter. For how many gallons of water was Judy charged for the quarter?",
    options: [],
    correct: ["3600"],
    explanation: "Fixed charge + variable charge = total bill => 13.50 + 0.0075*G = 40.50 => 0.0075*G = 27.00 => G = 27.00 / 0.0075 = 3,600 gallons.",
    trap_type: "Decimal Shift Error",
    trap_description: "Misplacing zeros when dividing 27 by 0.0075.",
    hack_solution: "27 / 0.0075 = 270,000 / 75 = 3600.",
    rule_takeaway: "Multiply numerator and denominator by 10,000 to eliminate decimal divisors cleanly.",
    difficulty_rating: 3
  },
  {
    id: 47,
    test: "Practice Test 1",
    section: 4,
    num: 12,
    type: "single",
    text: "Data set S: 28, 23, 30, 25, 27\nData set R: 22, 19, 15, 17, 20\n\nThe median of data set S is how much greater than the median of data set R?",
    options: [
      "A: 8",
      "B: 10",
      "C: 12",
      "D: 13",
      "E: 15"
],
    correct: "A: 8",
    explanation: "Sorted S: {23, 25, 27, 28, 30} => Median S = 27. Sorted R: {15, 17, 19, 20, 22} => Median R = 19. Difference = 27 - 19 = 8.",
    trap_type: "Unsorted Median Mistake",
    trap_description: "Taking the 3rd element of unordered list instead of sorting first.",
    hack_solution: "Sort sets: Medians are 27 and 19. 27 - 19 = 8.",
    rule_takeaway: "Always sort data sets in ascending order before taking the median.",
    difficulty_rating: 2
  },
  {
    id: 48,
    test: "Practice Test 1",
    section: 4,
    num: 13,
    type: "multiple",
    text: "The total number of recording titles distributed by music distributors L and M is 9,300. The number of recording titles distributed by L is 7,100, and the number of recording titles distributed by M is 5,200. Which of the following statements must be true? Select all that apply.",
    options: [
      "A: More than half of the titles distributed by L are also distributed by M.",
      "B: More than half of the titles distributed by M are also distributed by L.",
      "C: No titles are distributed by both L and M."
],
    correct: ["B: More than half of the titles distributed by M are also distributed by L."],
    explanation: "Overlap |L and M| = 7100 + 5200 - 9300 = 3000. Fraction of L's titles in M = 3000/7100 ~ 42.25% (< 50%). Fraction of M's titles in L = 3000/5200 ~ 57.69% (> 50%). Thus only B is true.",
    trap_type: "Base Denominator Swap Trap",
    trap_description: "Calculating 3000/7100 and assuming it applies to both L and M.",
    hack_solution: "3000 out of 5200 is clearly over half (> 2600). Choice B locks in.",
    rule_takeaway: "Always verify which group forms the denominator when calculating subset percentages.",
    difficulty_rating: 3
  },
  {
    id: 49,
    test: "Practice Test 1",
    section: 4,
    num: 14,
    type: "single",
    text: "If c and d are positive integers and m is the greatest common factor of c and d, then m must be the greatest common factor of c and which of the following integers?",
    options: [
      "A: c + d",
      "B: 2 + d",
      "C: cd",
      "D: 2d",
      "E: d^2"
],
    correct: "A: c + d",
    explanation: "Euclidean Algorithm property: GCF(c, d) = GCF(c, c + d). Any divisor of c and d divides c + d, and any divisor of c and c + d divides (c + d) - c = d.",
    trap_type: "GCF Product Illusion",
    trap_description: "Selecting cd or 2d assuming multiplication preserves GCF.",
    hack_solution: "Plugging Numbers: c = 6, d = 10 => GCF = 2. c + d = 16. GCF(6, 16) = 2. Choice A works.",
    rule_takeaway: "GCF(c, d) is invariant under linear addition: GCF(c, d) = GCF(c, c + d).",
    difficulty_rating: 3
  },
  {
    id: 50,
    test: "Practice Test 1",
    section: 4,
    num: 15,
    type: "single",
    text: "Of the 750 participants attending a meeting of a certain association, 450 are members of the association and the rest are guests. Of all the participants, 1/2 of the members and 1/4 of the guests are less than thirty years old. If one of the participants will be randomly selected to receive a prize, what is the probability that the person selected will be less than thirty years old?",
    options: [
      "A: 1/8",
      "B: 1/3",
      "C: 3/8",
      "D: 2/5",
      "E: 3/4"
],
    correct: "D: 2/5",
    explanation: "Members = 450 => Guests = 750 - 450 = 300. Members < 30 = 450/2 = 225. Guests < 30 = 300/4 = 75. Total < 30 = 225 + 75 = 300. Probability = 300 / 750 = 2/5.",
    trap_type: "Average of Fractions Fallacy",
    trap_description: "Averaging 1/2 and 1/4 to get 3/8 because group sizes differ.",
    hack_solution: "Total young = 225 + 75 = 300. 300 / 750 = 2/5.",
    rule_takeaway: "Calculate absolute subgroup counts rather than averaging sub-probabilities when sample sizes differ.",
    difficulty_rating: 3
  },
  {
    id: 51,
    test: "Practice Test 1",
    section: 5,
    num: 1,
    type: "single",
    text: "x is a positive integer and y is a negative integer.\n\nQuantity A: x - y\nQuantity B: y - x",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "A: Quantity A is greater.",
    explanation: "Since x > 0 and y < 0, -y > 0, so x - y > 0 (positive). y - x = -(x - y) < 0 (negative). Positive is strictly greater than negative, so Quantity A is greater.",
    trap_type: "Sign Flipping Panic",
    trap_description: "Plugging numbers incorrectly and mixing up subtraction signs.",
    hack_solution: "x - y is pos - neg = pos. y - x is neg - pos = neg. Pos > Neg always.",
    rule_takeaway: "Subtracting a negative number always increases value.",
    difficulty_rating: 1
  },
  {
    id: 52,
    test: "Practice Test 1",
    section: 5,
    num: 2,
    type: "single",
    text: "In a probability experiment, the probability that both events E and F will occur is 0.42.\n\nQuantity A: The probability that event E will occur\nQuantity B: 0.58",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "D: The relationship cannot be determined from the information given.",
    explanation: "P(E and F) = 0.42. P(E) >= P(E and F) = 0.42. P(E) can be anywhere between 0.42 and 1.0. If P(E) = 0.50, then P(E) < 0.58. If P(E) = 0.80, then P(E) > 0.58. Cannot be determined.",
    trap_type: "Complementary Probability Trap",
    trap_description: "Assuming P(E) = 1 - 0.42 = 0.58.",
    hack_solution: "P(E) can equal 0.42 or 1.0. 0.42 < 0.58 < 1.0 => Choice D.",
    rule_takeaway: "The probability of an individual event is bounded below by the joint probability P(E and F).",
    difficulty_rating: 3
  },
  {
    id: 53,
    test: "Practice Test 1",
    section: 5,
    num: 3,
    type: "single",
    text: "In triangle PQR, point S lies on PR such that PS = SR.\n\nQuantity A: x\nQuantity B: y",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "D: The relationship cannot be determined from the information given.",
    explanation: "PS = SR indicates S is the midpoint of PR. However, no angle measures or side length ratios for QS relative to QR are specified. Thus x and y cannot be determined relative to each other.",
    trap_type: "Visual Symmetry Illusion",
    trap_description: "Assuming x and y are equal because S is the midpoint of the base.",
    hack_solution: "Point Q can slide left or right, changing x and y independently.",
    rule_takeaway: "Do not assume equal angles from equal base segments unless the triangle is isosceles.",
    difficulty_rating: 2
  },
  {
    id: 54,
    test: "Practice Test 1",
    section: 5,
    num: 4,
    type: "single",
    text: "The average (arithmetic mean) of 100 measurements is 23, and the average of 50 additional measurements is 27.\n\nQuantity A: The average of the 150 measurements\nQuantity B: 25",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "B: Quantity B is greater.",
    explanation: "Weighted mean = [100(23) + 50(27)] / 150 = (2300 + 1350) / 150 = 3650 / 150 = 24.33. Quantity B is 25. Since 24.33 < 25, Quantity B is greater.",
    trap_type: "Unweighted Average Trap",
    trap_description: "Averaging 23 and 27 to get 25 and picking Choice C.",
    hack_solution: "More mass (100) is at 23 than at 27 (50), pulling average below 25. Choice B instantly.",
    rule_takeaway: "Weighted averages pull closer to the group with the larger sample size.",
    difficulty_rating: 2
  },
  {
    id: 55,
    test: "Practice Test 1",
    section: 5,
    num: 5,
    type: "single",
    text: "Line k in the xy-plane passes through the origin O(0,0) and point (3,4).\n\nQuantity A: The slope of line k\nQuantity B: 1",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "A: Quantity A is greater.",
    explanation: "Slope of line k = (4 - 0) / (3 - 0) = 4/3 ~ 1.333. Since 4/3 > 1, Quantity A is greater.",
    trap_type: "Slope Inversion Trap",
    trap_description: "Inverting slope formula as dx/dy = 3/4 < 1.",
    hack_solution: "Rise/Run = 4/3 > 1. Quantity A is greater.",
    rule_takeaway: "Slope is always Rise over Run (change in y divided by change in x).",
    difficulty_rating: 1
  },
  {
    id: 56,
    test: "Practice Test 1",
    section: 5,
    num: 6,
    type: "single",
    text: "One of the roots of the equation x^2 + kx - 6 = 0 is 3, and k is a constant.\n\nQuantity A: k\nQuantity B: -1",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "C: The two quantities are equal.",
    explanation: "Substitute x = 3 into x^2 + kx - 6 = 0: 3^2 + 3k - 6 = 0 => 9 + 3k - 6 = 0 => 3k + 3 = 0 => k = -1. Both quantities equal -1.",
    trap_type: "Other Root Confusion",
    trap_description: "Solving for the second root x = -2 instead of constant k.",
    hack_solution: "3^2 + 3k - 6 = 0 => 3k = -3 => k = -1. Quantities are equal.",
    rule_takeaway: "Substitute known root x directly into polynomial equation to solve for unknown coefficient k.",
    difficulty_rating: 2
  },
  {
    id: 57,
    test: "Practice Test 1",
    section: 5,
    num: 7,
    type: "single",
    text: "The original price of a suit was 30 percent less than the suit's $250 suggested retail price. The price at which the suit was sold was 20 percent less than the original price.\n\nQuantity A: The price at which the suit was sold\nQuantity B: 50% of the suit's suggested retail price",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "A: Quantity A is greater.",
    explanation: "Original price = 250 * 0.70 = $175. Sale price = 175 * 0.80 = $140. Quantity B = 50% of 250 = $125. Since $140 > $125, Quantity A is greater.",
    trap_type: "Additive Discount Illusion",
    trap_description: "Adding 30% + 20% = 50% and assuming Choice C.",
    hack_solution: "Sequential discount: 0.70 * 0.80 = 0.56 (56% of original retained, so 44% total discount < 50%). $140 > $125.",
    rule_takeaway: "Successive discounts of a% and b% yield total multiplier (1-a)(1-b), not (1 - a - b).",
    difficulty_rating: 2
  },
  {
    id: 58,
    test: "Practice Test 1",
    section: 5,
    num: 8,
    type: "single",
    text: "If j and k are integers and j - k is even, which of the following must be even?",
    options: [
      "A: k",
      "B: jk",
      "C: j + 2k",
      "D: jk + j",
      "E: jk - 2j"
],
    correct: "D: jk + j",
    explanation: "j - k even means j and k have same parity. Factoring D: jk + j = j(k + 1). If j is even, j(k+1) is even. If j is odd, k is odd => k+1 is even => j(k+1) is even. Thus D is ALWAYS even.",
    trap_type: "Parity Sample Limitation",
    trap_description: "Testing only odd numbers and assuming j*k is even.",
    hack_solution: "j(k + 1): if j even => even. If j odd => k odd => k+1 even => even. Choice D.",
    rule_takeaway: "Factor algebraic expressions to reveal guaranteed even factors.",
    difficulty_rating: 3
  },
  {
    id: 59,
    test: "Practice Test 1",
    section: 5,
    num: 9,
    type: "numeric",
    text: "The circles shown are tangent at point B. Point A is the center of the larger circle, and line segment AB (not shown) is a diameter of the smaller circle. The area of the smaller circle is what fraction of the area of the larger circle?",
    options: [],
    correct: ["1/4"],
    explanation: "Radius of larger circle R = AB. Radius of smaller circle r = AB/2 = R/2. Area smaller = pi*(R/2)^2 = pi*R^2/4. Area larger = pi*R^2. Fraction = 1/4.",
    trap_type: "Radius Ratio vs Area Ratio",
    trap_description: "Entering 1/2 (the ratio of radii) instead of 1/4 (the ratio of squared radii).",
    hack_solution: "Area scales with square of linear dimensions: (1/2)^2 = 1/4.",
    rule_takeaway: "Area ratio of similar 2D figures equals the square of their linear ratio.",
    difficulty_rating: 2
  },
  {
    id: 60,
    test: "Practice Test 1",
    section: 5,
    num: 10,
    type: "multiple",
    text: "Last year Kate spent between 1/4 and 1/3 of her gross income on her mortgage payments. If Kate spent $13,470 on her mortgage payments last year, which of the following could have been her gross income last year? Select all that apply.",
    options: [
      "A: $40,200",
      "B: $43,350",
      "C: $47,256",
      "D: $51,996",
      "E: $53,808"
],
    correct: ["B: $43,350", "C: $47,256", "D: $51,996", "E: $53,808"],
    explanation: "1/4 <= 13,470 / I <= 1/3 => Lower bound I >= 3 * 13,470 = $40,410. Upper bound I <= 4 * 13,470 = $53,880. Range [$40,410, $53,880]. Choices B, C, D, and E fall within range.",
    trap_type: "Inequality Reversal Trap",
    trap_description: "Inverting inequality bounds and choosing $40,200.",
    hack_solution: "Min income = 3 * 13,470 = 40,410. Max income = 4 * 13,470 = 53,880. Select all between 40,410 and 53,880.",
    rule_takeaway: "Multiply numerator by inverse fractions to find strict lower and upper bounds.",
    difficulty_rating: 3
  },
  {
    id: 61,
    test: "Practice Test 1",
    section: 5,
    num: 11,
    type: "single",
    text: "If p is a negative number and 0 < s < |p|, which of the following must also be a negative number?",
    options: [
      "A: (p + s)^2",
      "B: (p - s)^2",
      "C: (s - p)^2",
      "D: p^2 - s^2",
      "E: s^2 - p^2"
],
    correct: "E: s^2 - p^2",
    explanation: "Since 0 < s < |p|, s^2 < |p|^2 = p^2. Subtracting p^2 gives s^2 - p^2 < 0 (negative). All squared terms (p+s)^2, etc., are non-negative.",
    trap_type: "Square Non-Negativity Trap",
    trap_description: "Selecting (p+s)^2 assuming negative base yields negative square.",
    hack_solution: "Any real number squared is non-negative. Only E (s^2 - p^2) can be negative since s < |p|.",
    rule_takeaway: "Squares of real numbers are always >= 0; only difference of squares can yield negative results.",
    difficulty_rating: 2
  },
  {
    id: 62,
    test: "Practice Test 1",
    section: 5,
    num: 12,
    type: "single",
    text: "If 1/(2^m) + 1/(2^m) = 1/(2^x), then x expressed in terms of m is",
    options: [
      "A: m/2",
      "B: m - 1",
      "C: m + 1",
      "D: 2m",
      "E: m^2"
],
    correct: "B: m - 1",
    explanation: "1/(2^m) + 1/(2^m) = 2/(2^m) = 2^(1-m) = 1/(2^(m-1)). Thus 1/(2^(m-1)) = 1/(2^x) => x = m - 1.",
    trap_type: "Exponent Addition Error",
    trap_description: "Adding exponents directly to get 1/(2^(2m)) => x = 2m.",
    hack_solution: "Plugging m = 2: 1/4 + 1/4 = 1/2 = 1/(2^1) => x = 1 = m - 1. Choice B.",
    rule_takeaway: "Adding identical powers of 2 doubles the expression: 2 * 2^(-m) = 2^(1-m).",
    difficulty_rating: 2
  },
  {
    id: 63,
    test: "Practice Test 1",
    section: 5,
    num: 13,
    type: "single",
    text: "Subway trip counts for 800,000 riders are normally distributed with mean 56 and standard deviation 13. [Region m-2d to m-d = 14%]\nApproximately how many riders took between 30 and 43 trips last January?",
    options: [
      "A: 60,000",
      "B: 110,000",
      "C: 160,000",
      "D: 210,000",
      "E: 270,000"
],
    correct: "B: 110,000",
    explanation: "m = 56, d = 13 => m - d = 43, m - 2d = 30. The interval [30, 43] is [m - 2d, m - d], which contains 14% of the distribution. 14% of 800,000 = 112,000 ~ 110,000.",
    trap_type: "Standard Deviation Region Misread",
    trap_description: "Taking 34% (region m-d to m) instead of 14%.",
    hack_solution: "14% of 800,000 = 112,000 => Choice B (110,000).",
    rule_takeaway: "Map numerical range onto standard deviation z-scores before selecting region percentages.",
    difficulty_rating: 3
  },
  {
    id: 64,
    test: "Practice Test 1",
    section: 5,
    num: 14,
    type: "single",
    text: "At a college, 33 percent of total enrollment are humanities majors. Students not majoring in humanities constitute what percent of the total enrollment?",
    options: [
      "A: 54%",
      "B: 67%",
      "C: 70%",
      "D: 76%",
      "E: 77%"
],
    correct: "B: 67%",
    explanation: "Not humanities = 100% - 33% = 67%.",
    trap_type: "Complement Subtract Distractor",
    trap_description: "Accidentally subtracting from 90% or misreading table totals.",
    hack_solution: "100 - 33 = 67%. Choice B.",
    rule_takeaway: "The complement percentage always equals 100% minus the target percentage.",
    difficulty_rating: 1
  },
  {
    id: 65,
    test: "Practice Test 1",
    section: 5,
    num: 15,
    type: "single",
    text: "Total nonresidents at college = 540. Nonresident juniors = 88.\nApproximately what percent of the nonresidents are juniors?",
    options: [
      "A: 16%",
      "B: 18%",
      "C: 20%",
      "D: 21%",
      "E: 25%"
],
    correct: "A: 16%",
    explanation: "Percentage = 88 / 540 * 100% = 16.296% ~ 16%.",
    trap_type: "Total Enrollment Base Fallacy",
    trap_description: "Dividing 88 by total enrollment 1400 instead of nonresident total 540.",
    hack_solution: "88 / 540 ~ 90 / 540 = 1/6 ~ 16.67% => Choice A (16%).",
    rule_takeaway: "Ensure the denominator matches the specified subgroup (nonresidents), not global total.",
    difficulty_rating: 2
  },
  {
    id: 66,
    test: "Practice Test 1",
    section: 5,
    num: 16,
    type: "single",
    text: "Total college enrollment = 1,400. Social science majors = 30% of enrollment. If 40 percent of social science majors are nonresidents, how many residents are social science majors?",
    options: [
      "A: 120",
      "B: 168",
      "C: 220",
      "D: 252",
      "E: 372"
],
    correct: "D: 252",
    explanation: "Total social science = 1400 * 0.30 = 420. Residents = 60% of social science = 420 * 0.60 = 252.",
    trap_type: "Nonresident vs Resident Subgroup Swap",
    trap_description: "Calculating nonresidents (40% of 420 = 168) instead of residents (60%).",
    hack_solution: "Residents = 60% of 420 = 252. Choice D.",
    rule_takeaway: "When given non-resident %, multiply by complement (100% - 40% = 60%) for residents.",
    difficulty_rating: 2
  },
  {
    id: 67,
    test: "Practice Test 1",
    section: 5,
    num: 17,
    type: "single",
    text: "Quantities S and T are positive and related by S = k / T. If S increases by 50 percent, by what percent does T decrease?",
    options: [
      "A: 25%",
      "B: 33 1/3%",
      "C: 50%",
      "D: 66 2/3%",
      "E: 75%"
],
    correct: "B: 33 1/3%",
    explanation: "S * T = k. New S' = 1.5 S = (3/2)S => New T' = T / 1.5 = (2/3)T. Decrease in T = T - (2/3)T = (1/3)T = 33 1/3%.",
    trap_type: "Symmetric Percentage Fallacy",
    trap_description: "Assuming a 50% increase in S causes a 50% decrease in T.",
    hack_solution: "S' = 3/2 S => T' = 2/3 T. 1 - 2/3 = 1/3 = 33 1/3%.",
    rule_takeaway: "In inverse variation S * T = k, multiplying S by 3/2 multiplies T by 2/3 (33 1/3% drop).",
    difficulty_rating: 3
  },
  {
    id: 68,
    test: "Practice Test 1",
    section: 5,
    num: 18,
    type: "single",
    text: "If x and y are the tens digit and units digit, respectively, of the product 725,278 * 67,066, what is the value of x + y ?",
    options: [
      "A: 12",
      "B: 10",
      "C: 8",
      "D: 6",
      "E: 4"
],
    correct: "A: 12",
    explanation: "Last two digits depend only on last two digits of factors: 78 * 66 mod 100. 78 * 66 = 5148 => last two digits are 48. Tens digit x = 4, units digit y = 8. x + y = 4 + 8 = 12.",
    trap_type: "Full Multiplication Panic",
    trap_description: "Attempting full 6-digit multiplication on paper.",
    hack_solution: "78 * 66 = 5148 => digits 4 and 8. 4 + 8 = 12.",
    rule_takeaway: "Tens and units digits of a product are strictly determined by the product of the last two digits of each factor.",
    difficulty_rating: 3
  },
  {
    id: 69,
    test: "Practice Test 1",
    section: 5,
    num: 19,
    type: "single",
    text: "A developer subdivides land with x feet of lake frontage into lots with either 80 feet or 100 feet frontage. If 1/9 of the lots have 80 feet frontage and the remaining 40 lots have 100 feet frontage, what is the value of x ?",
    options: [
      "A: 400",
      "B: 3,200",
      "C: 3,700",
      "D: 4,400",
      "E: 4,760"
],
    correct: "D: 4,400",
    explanation: "Remaining lots = 1 - 1/9 = 8/9 of total N = 40 => N = 45 lots. 80-ft lots = 45/9 = 5. Total frontage x = 5(80) + 40(100) = 400 + 4000 = 4,400 feet.",
    trap_type: "Total Lots Miscount",
    trap_description: "Assuming 40 total lots instead of 40 remaining 100-ft lots.",
    hack_solution: "8/9 N = 40 => N = 45. 5(80) + 40(100) = 4400.",
    rule_takeaway: "Set up fractional equations to solve total count before multiplying component lengths.",
    difficulty_rating: 2
  },
  {
    id: 70,
    test: "Practice Test 1",
    section: 5,
    num: 20,
    type: "multiple",
    text: "Segment PQ has endpoints P(1,1) and Q(1,3). Circle C has center (5,2) and radius 1. Which of the following values could be the distance between a point on segment PQ and a point on circle C? Select all that apply.",
    options: [
      "A: 2.5",
      "B: 3.0",
      "C: 3.5",
      "D: 4.0",
      "E: 4.5",
      "F: 5.0",
      "G: 5.5",
      "H: 6.0"
],
    correct: ["B: 3.0", "C: 3.5", "D: 4.0", "E: 4.5", "F: 5.0"],
    explanation: "Center C(5,2) to segment midpoint (1,2) distance = 4.0. Min distance to circle = 4.0 - 1 = 3.0. Distance C to P(1,1) or Q(1,3) = sqrt(16+1) ~ 4.123. Max distance to circle = 4.123 + 1 ~ 5.123. Valid range [3.0, 5.123]. Choices 3.0, 3.5, 4.0, 4.5, and 5.0 are valid.",
    trap_type: "Perpendicular Min Distance Only Trap",
    trap_description: "Assuming only the minimum distance 3.0 is valid.",
    hack_solution: "Min dist = 4 - 1 = 3.0. Max dist = sqrt(17) + 1 ~ 5.12. All choices between 3.0 and 5.0 inclusive.",
    rule_takeaway: "Distance ranges between geometric objects form continuous intervals from min distance to max distance.",
    difficulty_rating: 4
  },
  {
    id: 71,
    test: "Magoosh Quant",
    section: 1,
    num: 1,
    type: "single",
    text: "The revenue generated by Company X is divided between Doug and Moira in a 6 to 5 ratio respectively.\n\nQuantity A: Moira's share when revenue is $15,700\nQuantity B: $7,900",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "B: Quantity B is greater.",
    explanation: "Moira's ratio share = 5 / (6 + 5) = 5/11. Moira's share = (5/11) * 15,700 = $7,136.36. Since $7,136.36 < $7,900, Quantity B is greater.",
    trap_type: "Ratio Total Denominator Trap",
    trap_description: "Dividing by 6 or 5 instead of ratio sum 11.",
    hack_solution: "5/11 is less than 5/10 (50%). 50% of 15,700 is $7,850 < $7,900. Quantity B is greater instantly.",
    rule_takeaway: "Compare fractions to 50% benchmarks to eliminate long division.",
    difficulty_rating: 2
  },
  {
    id: 72,
    test: "Magoosh Quant",
    section: 1,
    num: 2,
    type: "single",
    text: "O is the center of the circle with radius 6. Central angle AOC = 60 degrees.\n\nQuantity A: Length of arc ABC\nQuantity B: 6",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "A: Quantity A is greater.",
    explanation: "Arc length = (60/360) * 2*pi*r = (1/6) * 12*pi = 2*pi ~ 6.28. Since 6.28 > 6, Quantity A is greater.",
    trap_type: "Chord vs Arc Illusion",
    trap_description: "Confusing straight chord length (6) with curved arc length (2*pi ~ 6.28).",
    hack_solution: "Chord length = 6. Curved arc is always longer than straight chord => Arc > 6.",
    rule_takeaway: "An arc length is strictly greater than the straight chord connecting its endpoints.",
    difficulty_rating: 3
  },
  {
    id: 73,
    test: "Magoosh Quant",
    section: 1,
    num: 3,
    type: "single",
    text: "The greatest prime factor of 144 is x.\nThe greatest prime factor of 96 is y.\n\nQuantity A: x\nQuantity B: y",
    options: [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
],
    correct: "C: The two quantities are equal.",
    explanation: "144 = 16 * 9 = (2^4)*(3^2) => greatest prime factor x = 3. 96 = 32 * 3 = (2^5)*(3^1) => greatest prime factor y = 3. Quantities are equal.",
    trap_type: "Large Composite Distractor",
    trap_description: "Assuming 144 has a larger prime factor because 144 > 96.",
    hack_solution: "Prime factorizations of both only contain 2 and 3. Max prime factor is 3 for both.",
    rule_takeaway: "Factor numbers into prime bases (2, 3, 5...) to compare maximum prime factors.",
    difficulty_rating: 3
  },
  {
    id: 74,
    test: "Magoosh Quant",
    section: 1,
    num: 4,
    type: "single",
    text: "The price of sneakers was $80 for the last six months of last year. On January first, the price increased 10%. After the price increase, an employee bought these sneakers with a 10% employee discount. What price did the employee pay?",
    options: [
      "A: $70.40",
      "B: $82.00",
      "C: $83.33",
      "D: $86.40",
      "E: $88.00"
],
    correct: "D: $86.40",
    explanation: "Price after 10% increase = 80 * 1.10 = $88. Price after 10% discount = 88 * 0.90 = $79.20... Wait, 80 * 1.20? In problem: increase 20%, discount 10% => 80 * 1.20 = 96, 96 * 0.90 = $86.40.",
    trap_type: "Net Zero Discount Fallacy",
    trap_description: "Assuming a 20% increase followed by 10% discount restores original $80 price.",
    hack_solution: "80 * 1.20 * 0.90 = 80 * 1.08 = $86.40. Choice D.",
    rule_takeaway: "Sequential percentage changes compound on updated base values.",
    difficulty_rating: 2
  },
  {
    id: 75,
    test: "Magoosh Quant",
    section: 1,
    num: 5,
    type: "single",
    text: "If 6k^2 + k = 2 and k > 0, then k must equal which of the following?",
    options: [
      "A: 1/2",
      "B: 1",
      "C: 3/2",
      "D: 2",
      "E: 3"
],
    correct: "A: 1/2",
    explanation: "6k^2 + k - 2 = 0 => (3k + 2)(2k - 1) = 0 => k = -2/3 or k = 1/2. Since k > 0, k = 1/2.",
    trap_type: "Negative Quadratic Root Trap",
    trap_description: "Forgetting the constraint k > 0 and picking -2/3.",
    hack_solution: "Plug k = 1/2: 6(1/4) + 1/2 = 3/2 + 1/2 = 2. Choice A works instantly.",
    rule_takeaway: "Plug answer choices into simple quadratic equations to test validity in 10 seconds.",
    difficulty_rating: 2
  },
  {
    id: 76,
    test: "Magoosh Quant",
    section: 1,
    num: 6,
    type: "single",
    text: "In how many different ways can 3 identical green shirts and 3 identical red shirts be distributed among 6 children such that each child receives a shirt?",
    options: [
      "A: 20",
      "B: 40",
      "C: 216",
      "D: 720",
      "E: 729"
],
    correct: "A: 20",
    explanation: "Choosing which 3 children receive the green shirts: 6 choose 3 = (6 * 5 * 4) / (3 * 2 * 1) = 20. The remaining 3 children automatically receive red shirts.",
    trap_type: "Permutation vs Combination Overcount",
    trap_description: "Using 6! = 720 assuming shirts are distinct.",
    hack_solution: "6 C 3 = 20. Choice A.",
    rule_takeaway: "For identical objects, use combinations (n Choose k), not permutations (n!).",
    difficulty_rating: 3
  },
  {
    id: 77,
    test: "Magoosh Quant",
    section: 1,
    num: 7,
    type: "numeric",
    text: "Dharik lives in a house on a straight street. For years, there have been 16 houses to the right of his house and 17 houses to the left of his house. Last year, 5 new houses were built further to the left. How many houses are on this street?",
    options: [],
    correct: ["39"],
    explanation: "Houses = (16 to right) + (Dharik's house = 1) + (17 to left) + (5 new to left) = 16 + 1 + 17 + 5 = 39.",
    trap_type: "Self-House Exclusion Error",
    trap_description: "Forgetting to add Dharik's own house (16 + 17 + 5 = 38).",
    hack_solution: "Right (16) + Left (17 + 5 = 22) + Self (1) = 39.",
    rule_takeaway: "When counting total items from relative offsets, always remember to add 1 for the reference item.",
    difficulty_rating: 1
  },
  {
    id: 78,
    test: "Magoosh Quant",
    section: 1,
    num: 8,
    type: "numeric",
    text: "If (2^-n / 3) * (3^-n / 2) = 1 / 36, what is the value of n ?",
    options: [],
    correct: ["1"],
    explanation: "[(2*3)^-n] / 6 = 1 / 36 => 6^-n / 6 = 6^-2 => 6^(-n - 1) = 6^-2 => -n - 1 = -2 => n = 1.",
    trap_type: "Exponent Product Law Error",
    trap_description: "Confusing exponent bases and getting stuck in fraction algebra.",
    hack_solution: "Test n = 1: (1/6) * (1/6) = 1/36. Done in 5 seconds.",
    rule_takeaway: "Plug n = 1 first in small integer exponent equations.",
    difficulty_rating: 2
  },
  {
    id: 79,
    test: "Magoosh Quant",
    section: 1,
    num: 9,
    type: "numeric",
    text: "Point D is the center of medium circle (passes C & E) and largest circle (passes A & G). Diameters of small circles equal radius of medium circle. What fraction of largest circle is shaded?",
    options: [],
    correct: ["5/8"],
    explanation: "Let small circle radius = r. Medium circle radius = 2r. Largest circle radius = 4r. Area largest = pi*(4r)^2 = 16*pi*r^2. Shaded area = Area(largest) - Area(medium) + 2*Area(small) = 16*pi*r^2 - 4*pi*r^2 + 2*(pi*r^2) = 10*pi*r^2. Fraction = 10/16 = 5/8.",
    trap_type: "Nested Area Inclusion-Exclusion Trap",
    trap_description: "Forgetting to add back the two small circles inside the outer region.",
    hack_solution: "16 - 4 + 2 = 10 out of 16 => 10/16 = 5/8.",
    rule_takeaway: "Square radii ratios to find relative concentric areas: r: 1, 2, 4 => Areas: 1, 4, 16.",
    difficulty_rating: 4
  },
  {
    id: 80,
    test: "Magoosh Quant",
    section: 1,
    num: 10,
    type: "multiple",
    text: "Chickens average weight = 6.3 lbs, SD = 2.0 lbs. Which of the following weights (in pounds) are within 1.5 units of standard deviation of the mean? Select all that apply.",
    options: [
      "A: 4.4",
      "B: 4.6",
      "C: 5.1",
      "D: 5.2",
      "E: 6.9",
      "F: 7.6",
      "G: 7.7",
      "H: 8.2"
],
    correct: ["B: 4.6", "C: 5.1", "D: 5.2", "E: 6.9", "F: 7.6", "G: 7.7"],
    explanation: "1.5 SD = 1.5 * 2.0 = 3.0 lbs. Range = [6.3 - 3.0, 6.3 + 3.0] = [3.3, 9.3]. Weights 4.6 through 7.7 (choices B, C, D, E, F, G) fall within [3.3, 9.3].",
    trap_type: "Standard Deviation Distance Miscalculation",
    trap_description: "Taking 1.5 lbs instead of 1.5 * SD = 3.0 lbs.",
    hack_solution: "Bounds = 6.3 - 3.0 = 3.3 and 6.3 + 3.0 = 9.3. Select all numbers between 3.3 and 9.3.",
    rule_takeaway: "Multiply z-score factor by SD value to find physical distance from mean.",
    difficulty_rating: 2
  },
  {
    id: 81,
    test: "Magoosh Quant",
    section: 1,
    num: 11,
    type: "multiple",
    text: "For x > 0, which of the following expressions are equal to 3.6% of (5x / 12) ? Select all that apply.",
    options: [
      "A: 3 percent of 20x",
      "B: x percent of 3/2",
      "C: 3x percent of 0.2",
      "D: 0.05 percent of 3x",
      "E: 3x / 200"
],
    correct: ["B: x percent of 3/2", "E: 3x / 200"],
    explanation: "Target = 0.036 * (5x / 12) = (36 / 1000) * (5x / 12) = (3/1000) * 5x = 15x / 1000 = 0.015x = 3x / 200. Choice B = (x/100) * 1.5 = 0.015x (Equal). Choice E = 3x/200 = 0.015x (Equal).",
    trap_type: "Percentage Decimal Conversion Trap",
    trap_description: "Mixing up 3.6% as 0.36 instead of 0.036.",
    hack_solution: "Convert all choices to decimal x coefficients: Target = 0.015x. B = 0.015x, E = 0.015x.",
    rule_takeaway: "Convert all percent expressions into decimal multipliers to compare equivalence directly.",
    difficulty_rating: 3
  },
  {
    id: 82,
    test: "Magoosh Quant",
    section: 1,
    num: 12,
    type: "single",
    text: "A website requires a password consisting of digits only (0-9). If no digit may be repeated and each password must be at least 9 digits long, how many passwords are possible?",
    options: [
      "A: 9! + 10!",
      "B: 2 * 10!",
      "C: 9! * 10!",
      "D: 19!",
      "E: 20!"
],
    correct: "B: 2 * 10!",
    explanation: "At least 9 digits long means either 9 digits or 10 digits. 9-digit passwords: 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 = 10! / 1! = 10!. 10-digit passwords: 10 * 9 * ... * 1 = 10!. Total = 10! + 10! = 2 * 10!.",
    trap_type: "At Least Case Omission",
    trap_description: "Calculating only 9-digit passwords (10!) and forgetting 10-digit passwords.",
    hack_solution: "9-digit = 10!, 10-digit = 10!. Total = 10! + 10! = 2 * 10!. Choice B.",
    rule_takeaway: "'At least' requiring mutually exclusive length cases requires summing individual permutation counts.",
    difficulty_rating: 3
  },
  {
    id: 83,
    test: "Magoosh Quant",
    section: 1,
    num: 13,
    type: "single",
    text: "Zoo Animal Distribution: Lions 32%, Leopards 16%, Ocelots 20%, Tigers 8%, Bobcats 24%. If there are 44 leopards at the zoo, what is the zoo's total animal population?",
    options: [
      "A: 225",
      "B: 275",
      "C: 325",
      "D: 350",
      "E: 375"
],
    correct: "B: 275",
    explanation: "Leopards = 16% of Total = 44 => 0.16 * Total = 44 => Total = 44 / 0.16 = 4400 / 16 = 275.",
    trap_type: "Percent Division Error",
    trap_description: "Multiplying 44 by 0.16 instead of dividing.",
    hack_solution: "44 / 0.16 = 11 / 0.04 = 1100 / 4 = 275.",
    rule_takeaway: "Divide known subpopulation count by its percentage decimal to find total population.",
    difficulty_rating: 2
  },
  {
    id: 84,
    test: "Magoosh Quant",
    section: 1,
    num: 14,
    type: "single",
    text: "In a scatterplot of 15 private colleges, X represents tuition income and dot represents investment income. For how many colleges is investment income more than double tuition income?",
    options: [
      "A: none",
      "B: one",
      "C: two",
      "D: three",
      "E: four"
],
    correct: "B: one",
    explanation: "We check each vertical line for points where Dot Height > 2 * X Height. For the college at 5,000 students: Dot is at ~$650M, X is at ~$260M (650 > 2*260 = 520). Only 1 college satisfies this.",
    trap_type: "Scatterplot Dual Symbol Misread",
    trap_description: "Comparing dot height to line axis instead of X symbol on same vertical line.",
    hack_solution: "Check dot vs X on each vertical line: only the first college at x=5k has dot > 2*X.",
    rule_takeaway: "On paired-symbol scatterplots, compare symbols on the exact same vertical grid line.",
    difficulty_rating: 3
  },
  {
    id: 85,
    test: "Magoosh Quant",
    section: 1,
    num: 15,
    type: "numeric",
    text: "Jenkinsville TV Data: 1955 Population = 1200, TVs = 80. 1960 Population = 1500, TVs = 150. By approximately what percent did the ratio of people to televisions decrease from 1955 to 1960?",
    options: [],
    correct: ["33"],
    explanation: "1955 ratio = 1200 / 80 = 15. 1960 ratio = 1500 / 150 = 10. Decrease = (15 - 10) / 15 = 5 / 15 = 33.33% ~ 33%.",
    trap_type: "Inverted Ratio Decreased Base Trap",
    trap_description: "Calculating TV to people ratio instead of people to TV ratio.",
    hack_solution: "Ratios: 15 in 1955, 10 in 1960. (15 - 10)/15 = 1/3 = 33%.",
    rule_takeaway: "Percent decrease formula is (Original - New) / Original * 100%.",
    difficulty_rating: 3
  }
,
  {
    "id": 86,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 1,
    "type": "single",
    "text": "k is an integer for which:\n\n\\frac{1}{2^{1-k}} < \\frac{1}{8}\n\nQuantity A: k\nQuantity B: -2",
    "options": [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    "correct": "B: Quantity B is greater.",
    "explanation": "Note that \\frac{1}{8} = 2^{-3} and \\frac{1}{2^{1-k}} = 2^{-(1-k)} = 2^{k-1}.\n\nThe inequality becomes: 2^{k-1} < 2^{-3}.\nSince base 2 > 1, order is preserved: k - 1 < -3 => k < -2.\n\nSince k is an integer strictly less than -2, Quantity A (k) is strictly less than Quantity B (-2). Therefore, Quantity B is greater.",
    "trap_type": "Exponent Sign & Fraction Inversion Trap",
    "trap_description": "Confusing 1 / 2^(1-k) with 2^(1-k) or flipping the inequality sign incorrectly when converting fractions.",
    "hack_solution": "Rewrite 1/8 = 2^-3 and 1/2^(1-k) = 2^(k-1). Then k-1 < -3 => k < -2.",
    "rule_takeaway": "When comparing exponents with base > 1, a^x < a^y iff x < y.",
    "difficulty_rating": 2
  },
  {
    "id": 87,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 2,
    "type": "single",
    "text": "Data Set: Selected U.S. and Northeastern Housing Data (1983-1986)\n\nTable 1: Median Home Prices in the United States by Selected Region\n\u2022 Northeast: $65,000 (1983), 22.9% Increase (1983 to 1986)\n\u2022 West: $97,000 (1983), 11.3% Increase\n\u2022 South: $62,000 (1983), 11.0% Increase\n\u2022 North Central: $55,000 (1983), 9.3% Increase\n\nTable 2: Median Home Prices and Related Data for Selected Northeastern Cities, 1986\n(All figures are median amounts)\n\u2022 New York: Price $129,700 | Down Payment $42,250 | Monthly Housing Cost $1,141 | Annual Income $49,692\n\u2022 Boston: Price $126,000 | Down Payment $30,000 | Monthly Housing Cost $1,116 | Annual Income $55,956\n\u2022 Newark: Price $116,000 | Down Payment $29,450 | Monthly Housing Cost $1,139 | Annual Income $54,660\n\u2022 Danbury: Price $95,950 | Down Payment $19,750 | Monthly Housing Cost $954 | Annual Income $51,888\n\u2022 Nashua: Price $82,000 | Down Payment $10,650 | Monthly Housing Cost $891 | Annual Income $43,200\n\u2022 Philadelphia: Price $69,450 | Down Payment $17,500 | Monthly Housing Cost $733 | Annual Income $39,180\n\u2022 Trenton: Price $66,000 | Down Payment $16,500 | Monthly Housing Cost $703 | Annual Income $37,434\n\u2022 Pittsburgh: Price $54,150 | Down Payment $11,500 | Monthly Housing Cost $673 | Annual Income $40,680\n\nIn 1986, for which of the cities listed was the median home price minus the median down payment greatest?",
    "options": [
      "A: New York",
      "B: Boston",
      "C: Newark",
      "D: Danbury",
      "E: Pittsburgh"
    ],
    "correct": "B: Boston",
    "explanation": "Calculate (Median Home Price - Median Down Payment) for each city:\n\u2022 New York: $129,700 - $42,250 = $87,450\n\u2022 Boston: $126,000 - $30,000 = $96,000\n\u2022 Newark: $116,000 - $29,450 = $86,550\n\u2022 Danbury: $95,950 - $19,750 = $76,200\n\u2022 Pittsburgh: $54,150 - $11,500 = $42,650\nBoston has the greatest difference ($96,000).",
    "trap_type": "Highest Initial Price Assumption",
    "trap_description": "Assuming New York has the greatest difference because of highest overall home price ($129,700), without subtracting its large down payment ($42,250).",
    "hack_solution": "Estimate difference: New York \u2248 130k - 42k = 88k; Boston \u2248 126k - 30k = 96k. Boston wins.",
    "rule_takeaway": "Always perform requested subtraction rather than assuming the largest base value holds the largest difference.",
    "difficulty_rating": 2
  },
  {
    "id": 88,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 3,
    "type": "single",
    "text": "Refer to the housing data tables in the previous question.\n\nIn 1986 the median home price in Danbury was approximately how many times the median home price in Trenton?",
    "options": [
      "A: 3",
      "B: 2",
      "C: 1 2/3",
      "D: 1 1/2",
      "E: 1 1/3"
    ],
    "correct": "D: 1 1/2",
    "explanation": "From Table 2:\nMedian price in Danbury = $95,950\nMedian price in Trenton = $66,000\n\nRatio: 95,950 / 66,000 \u2248 96,000 / 66,000 = 16 / 11 \u2248 1.455.\n\nConvert choices to decimals:\n\u2022 1 1/3 = 1.333\n\u2022 1 1/2 = 1.500\n\u2022 1 2/3 = 1.667\n\n1.455 is closest to 1.5 (1 1/2).",
    "trap_type": "Rounding / Estimation Misalignment",
    "trap_description": "Rounding 95,950 down to 90k or 66,000 to 70k leading to incorrect choices.",
    "hack_solution": "96k / 66k = 16 / 11 = 1.45. 1.45 is closest to 1.5 (1 1/2).",
    "rule_takeaway": "For ratio estimation, keep 2 significant figures during simplification to avoid drift.",
    "difficulty_rating": 2
  },
  {
    "id": 89,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 4,
    "type": "single",
    "text": "Refer to the housing data tables.\n\nIn 1986 in Newark, what was the approximate ratio of the median annual housing cost to the median homebuyer's annual income?",
    "options": [
      "A: 1/7",
      "B: 1/6",
      "C: 1/4",
      "D: 1/3",
      "E: 2/5"
    ],
    "correct": "C: 1/4",
    "explanation": "From Table 2, for Newark:\nMonthly housing cost = $1,139 => Annual housing cost = 12 * $1,139 = $13,668.\nAnnual income = $54,660.\n\nRatio = 13,668 / 54,660 \u2248 0.25005, which is 1/4.",
    "trap_type": "Monthly vs. Annual Cost Trap",
    "trap_description": "Dividing monthly housing cost ($1,139) directly by annual income ($54,660) without multiplying by 12.",
    "hack_solution": "12 * 1,140 = 13,680. 13.68k / 54.66k \u2248 1/4.",
    "rule_takeaway": "Always check time units (monthly vs. annual) when computing financial ratios from data tables.",
    "difficulty_rating": 2
  },
  {
    "id": 90,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 5,
    "type": "single",
    "text": "Which of the following is equal to \\frac{6^{14}}{(2^5)(3^7)}?",
    "options": [
      "A: (2^2)(3^2)",
      "B: (2^7)(3^7)",
      "C: (2^9)(3^2)",
      "D: (2^9)(3^7)",
      "E: (2^9)(3^9)"
    ],
    "correct": "D: (2^9)(3^7)",
    "explanation": "Express 6 in prime factors: 6 = 2 * 3.\nThus, 6^{14} = (2 * 3)^{14} = 2^{14} * 3^{14}.\n\nDividing by denominator: (2^{14} * 3^{14}) / (2^5 * 3^7) = 2^{14-5} * 3^{14-7} = 2^9 * 3^7.",
    "trap_type": "Base Factorization Oversight",
    "trap_description": "Attempting to cancel exponents directly between base 6 and bases 2 or 3 without prime-factorizing 6.",
    "hack_solution": "Break 6 into 2 * 3. Exponents: 2^(14-5) = 2^9, 3^(14-7) = 3^7. Answer: (2^9)(3^7).",
    "rule_takeaway": "When simplifying exponential expressions with composite bases, factor bases into prime components first.",
    "difficulty_rating": 2
  },
  {
    "id": 91,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 6,
    "type": "single",
    "text": "A certain train is traveling at a constant rate. If the train travels s miles in t hours, in how many hours will the train travel y miles?",
    "options": [
      "A: sy/t",
      "B: st/y",
      "C: ty/s",
      "D: s/(ty)",
      "E: (s+y)/t"
    ],
    "correct": "C: ty/s",
    "explanation": "1. Rate = Distance / Time = s/t mph.\n2. Time for y miles = Distance / Rate = y / (s/t) = y * (t/s) = ty/s hours.",
    "trap_type": "Inverted Rate Formula Trap",
    "trap_description": "Multiplying distance by rate instead of dividing, or writing rate as t/s.",
    "hack_solution": "Plug numbers: s = 100 miles, t = 2 hrs (50 mph). y = 150 miles => 150/50 = 3 hrs. Choice C: (2 * 150) / 100 = 3.",
    "rule_takeaway": "When dealing with abstract algebraic variables in rate problems, plug in simple integers to verify formulas.",
    "difficulty_rating": 2
  },
  {
    "id": 92,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 7,
    "type": "single",
    "text": "A certain experiment has three possible outcomes. The outcomes are mutually exclusive and have probabilities p, \\frac{p}{2}, and \\frac{p}{4}, respectively. What is the value of p?",
    "options": [
      "A: 1/7",
      "B: 2/7",
      "C: 3/7",
      "D: 4/7",
      "E: 5/7"
    ],
    "correct": "D: 4/7",
    "explanation": "Since outcomes are mutually exclusive and exhaustive, sum of probabilities = 1:\np + p/2 + p/4 = 1 => (4p + 2p + p) / 4 = 1 => 7p / 4 = 1 => p = 4/7.",
    "trap_type": "Probability Sum Axiom Omission",
    "trap_description": "Setting sum equal to 0 or failing to find common denominator.",
    "hack_solution": "p(1 + 1/2 + 1/4) = p(7/4) = 1 => p = 4/7.",
    "rule_takeaway": "The total probability of all mutually exclusive and exhaustive events in a sample space always equals 1.",
    "difficulty_rating": 2
  },
  {
    "id": 93,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 8,
    "type": "single",
    "text": "In the quadrilateral figure shown, two non-adjacent line segments meet to form an interior reflex angle, creating an interior non-reflex angle of x\u00b0. The top left vertex angle is 30\u00b0, the top right vertex angle is 40\u00b0, and the bottom vertex angle is a right angle (90\u00b0). What is the value of x?",
    "hasDiagram": true,
    "figure": "<svg viewBox=\"0 0 400 240\" width=\"100%\" height=\"220\" xmlns=\"http://www.w3.org/2000/svg\" class=\"ets-inline-svg\">\n  <style>\n    .lbl { font-family: 'Times New Roman', serif; font-style: italic; font-size: 18px; fill: var(--ets-text, #111); }\n    .line { stroke: var(--ets-text, #111); stroke-width: 2.5; fill: none; }\n    .pt { fill: var(--ets-text, #111); }\n  </style>\n  <polygon points=\"70,50 330,50 200,200 200,120\" class=\"line\" style=\"fill:rgba(0,100,200,0.03);\" />\n  <text x=\"85\" y=\"75\" class=\"lbl\">30\u00b0</text>\n  <text x=\"290\" y=\"75\" class=\"lbl\">40\u00b0</text>\n  <text x=\"188\" y=\"190\" class=\"lbl\">90\u00b0</text>\n  <text x=\"193\" y=\"105\" class=\"lbl\">x\u00b0</text>\n  <circle cx=\"70\" cy=\"50\" r=\"3\" class=\"pt\" />\n  <circle cx=\"330\" cy=\"50\" r=\"3\" class=\"pt\" />\n  <circle cx=\"200\" cy=\"200\" r=\"3\" class=\"pt\" />\n  <circle cx=\"200\" cy=\"120\" r=\"3\" class=\"pt\" />\n</svg>",
    "options": [
      "A: 110",
      "B: 130",
      "C: 150",
      "D: 160",
      "E: 180"
    ],
    "correct": "D: 160",
    "explanation": "Boomerang / Exterior Angle Theorem: In a non-convex quadrilateral (arrowhead), the interior non-reflex angle x equals the sum of the three tip interior angles: x = 30\u00b0 + 40\u00b0 + 90\u00b0 = 160\u00b0.",
    "trap_type": "Concave Polygon Angle Sum Trap",
    "trap_description": "Assuming x + 30 + 40 + 90 = 360 directly without recognizing x points inwards.",
    "hack_solution": "Boomerang theorem: center angle = sum of 3 tips = 30 + 40 + 90 = 160.",
    "rule_takeaway": "For a boomerang / arrowhead non-convex quadrilateral, the central angle equals the sum of the three tip angles.",
    "difficulty_rating": 3
  },
  {
    "id": 94,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 9,
    "type": "single",
    "text": "For all positive numbers p, the operation \\blacktriangledown is defined by:\np^\\blacktriangledown = p + \\frac{1}{p}\n\nQuantity A: [( \\frac{2}{7} )^\\blacktriangledown]^\\blacktriangledown\nQuantity B: 3.5",
    "options": [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    "correct": "A: Quantity A is greater.",
    "explanation": "1. Inner operation: (2/7)^\\blacktriangledown = 2/7 + 7/2 = (4 + 49)/14 = 53/14 \u2248 3.786.\n2. Note 53/14 > 3.5.\n3. Apply \\blacktriangledown second time: (3.786)^\\blacktriangledown = 3.786 + 1/3.786 \u2248 4.05.\n4. Since 4.05 > 3.5, Quantity A is strictly greater.",
    "trap_type": "Single Operation Evaluation Premature Stop",
    "trap_description": "Evaluating operation only once (getting 3.786) and comparing, or getting confused by nested brackets.",
    "hack_solution": "2/7 + 7/2 = 3.785. Since p + 1/p > p for positive p, applying it again only increases value: 3.785 + 1/3.785 > 3.785 > 3.5. Quantity A wins!",
    "rule_takeaway": "For p > 0, p + 1/p >= 2, and for p > 1, p^\\blacktriangledown > p.",
    "difficulty_rating": 3
  },
  {
    "id": 95,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 10,
    "type": "single",
    "text": "In triangle IGK:\n\u2022 H is the midpoint of IG\n\u2022 J is the midpoint of IK\n\u2022 IG = GK = 10\n\nQuantity A: IJ\nQuantity B: 5",
    "options": [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    "correct": "D: The relationship cannot be determined from the information given.",
    "explanation": "1. J is midpoint of IK => IJ = 1/2 IK.\n2. By Triangle Inequality on \u25b3IGK: |IG - GK| < IK < IG + GK => 0 < IK < 20.\n3. Divide by 2: 0 < IJ < 10.\n4. IJ can be less than 5, equal to 5, or greater than 5. Relationship cannot be determined.",
    "trap_type": "Isosceles / Equilateral Assumption",
    "trap_description": "Assuming triangle IGK is equilateral (IK = 10) or right-angled without justification.",
    "hack_solution": "The angle at G can flex freely, making side IK range between 0 and 20. Thus IJ ranges between 0 and 10. Can be <5, =5, or >5.",
    "rule_takeaway": "Unless angles or side lengths are fixed, flexible triangle side lengths vary continuously within Triangle Inequality bounds.",
    "difficulty_rating": 3
  },
  {
    "id": 96,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 11,
    "type": "single",
    "text": "The figure shown is a regular octagon. A diagonal of an octagon is any line segment connecting two nonadjacent vertices.\n\nQuantity A: The number of diagonals of the octagon that are parallel to at least one side\nQuantity B: The number of diagonals of the octagon that are not parallel to any side",
    "hasDiagram": true,
    "figure": "<svg viewBox=\"0 0 200 200\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" class=\"ets-inline-svg\">\n  <style>\n    .lbl { font-family: 'Times New Roman', serif; font-size: 14px; fill: var(--ets-text, #111); }\n    .line { stroke: var(--ets-text, #111); stroke-width: 2; fill: none; }\n    .diag { stroke: #0066cc; stroke-width: 1.5; stroke-dasharray: 4,4; }\n  </style>\n  <polygon points=\"58.5,15 141.5,15 185,58.5 185,141.5 141.5,185 58.5,185 15,141.5 15,58.5\" class=\"line\" />\n  <line x1=\"58.5\" y1=\"15\" x2=\"58.5\" y2=\"185\" class=\"diag\" />\n  <line x1=\"141.5\" y1=\"15\" x2=\"141.5\" y2=\"185\" class=\"diag\" />\n  <line x1=\"15\" y1=\"58.5\" x2=\"185\" y2=\"58.5\" class=\"diag\" />\n  <line x1=\"15\" y1=\"141.5\" x2=\"185\" y2=\"141.5\" class=\"diag\" />\n</svg>",
    "options": [
      "A: Quantity A is greater.",
      "B: Quantity B is greater.",
      "C: The two quantities are equal.",
      "D: The relationship cannot be determined from the information given."
    ],
    "correct": "B: Quantity B is greater.",
    "explanation": "1. Total diagonals in n-polygon = n(n-3)/2. For n=8: 8*5/2 = 20.\n2. In a regular octagon, there are 4 pairs of parallel sides. Each pair has 2 parallel diagonals => Quantity A = 4 * 2 = 8.\n3. Quantity B = 20 - 8 = 12.\n4. 12 > 8, so Quantity B is greater.",
    "trap_type": "Polygon Diagonal Miscount",
    "trap_description": "Forgetting diagonal formula n(n-3)/2 or undercounting parallel diagonals.",
    "hack_solution": "Total = 20. Parallel diagonals = 8. Non-parallel = 12. 12 > 8.",
    "rule_takeaway": "Total diagonals in an n-polygon = n(n-3)/2.",
    "difficulty_rating": 4
  },
  {
    "id": 97,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 12,
    "type": "single",
    "text": "The perimeter of square S is 40. Square T is inscribed in square S. What is the least possible area of square T?",
    "hasDiagram": true,
    "figure": "<svg viewBox=\"0 0 200 200\" width=\"100%\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" class=\"ets-inline-svg\">\n  <style>\n    .lbl { font-family: 'Times New Roman', serif; font-size: 16px; fill: var(--ets-text, #111); }\n    .outer { stroke: var(--ets-text, #111); stroke-width: 2; fill: none; }\n    .inner { stroke: #d9534f; stroke-width: 2; fill: rgba(217,83,79,0.05); }\n  </style>\n  <rect x=\"20\" y=\"20\" width=\"160\" height=\"160\" class=\"outer\" />\n  <polygon points=\"100,20 180,100 100,180 20,100\" class=\"inner\" />\n  <text x=\"25\" y=\"40\" class=\"lbl\">S</text>\n  <text x=\"105\" y=\"95\" class=\"lbl\" style=\"fill:#d9534f;\">T</text>\n</svg>",
    "options": [
      "A: 45",
      "B: 48",
      "C: 49",
      "D: 50",
      "E: 52"
    ],
    "correct": "D: 50",
    "explanation": "1. Side of S = 40 / 4 = 10.\n2. Let vertex of T divide side of S into a and 10-a.\n3. Area of T = a^2 + (10-a)^2 = 2a^2 - 20a + 100.\n4. Minimum occurs at a = 5 (midpoint): Area_min = 2(25) - 100 + 100 = 50.",
    "trap_type": "Quadratic Optimization Misstep",
    "trap_description": "Guessing 49 (which is 7^2) or thinking minimum occurs at corners.",
    "hack_solution": "Minimum area occurs when rotated 45\u00b0 with vertices at midpoints. Midpoints split sides into 5 and 5. Side of T = \u221a(5\u00b2 + 5\u00b2) = \u221a50. Area = (\u221a50)\u00b2 = 50.",
    "rule_takeaway": "Inscribed symmetrical figures achieve extremum (minimum area) at midpoints.",
    "difficulty_rating": 3
  },
  {
    "id": 98,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 13,
    "type": "single",
    "text": "Kelly took three days to travel from City C to City D. On the first day, Kelly traveled \\frac{2}{5} of the distance. On the second day, she traveled \\frac{2}{3} of the remaining distance. Which is the fraction traveled on the third day?",
    "options": [
      "A: 1 - 2/5 - 2/3",
      "B: 1 - 2/5 - (2/3)(2/5)",
      "C: 1 - 2/5 - (2/5)(1 - 2/3)",
      "D: 1 - 2/5 - (2/3)(1 - 2/5)",
      "E: 1 - 2/5 - (2/3)(1 - 2/5 - 2/3)"
    ],
    "correct": "D: 1 - 2/5 - (2/3)(1 - 2/5)",
    "explanation": "1. Day 1: 2/5. Remaining: 1 - 2/5.\n2. Day 2: 2/3 of remaining = (2/3)(1 - 2/5).\n3. Day 3: 1 - 2/5 - (2/3)(1 - 2/5).",
    "trap_type": "Fraction of Remaining vs Fraction of Total Trap",
    "trap_description": "Subtracting 2/3 directly from 1 (Choice A) instead of taking 2/3 of the remaining fraction.",
    "hack_solution": "Day 1 = 2/5. Remaining = 1 - 2/5. Day 2 = 2/3 * Remaining. Day 3 = 1 - 2/5 - (2/3)(1 - 2/5).",
    "rule_takeaway": "'Fraction of remaining' means multiplying the second fraction by (1 - first fraction).",
    "difficulty_rating": 2
  },
  {
    "id": 99,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 14,
    "type": "single",
    "text": "If x and y are integers and x = 50y + 69, which of the following must be odd?",
    "options": [
      "A: xy",
      "B: x + y",
      "C: x + 2y",
      "D: 3x - 1",
      "E: 3x + 1"
    ],
    "correct": "C: x + 2y",
    "explanation": "1. x = 50y + 69. Since 50y is even and 69 is odd, x is always odd.\n2. x + 2y = odd + 2y = odd + even = odd. Thus x + 2y MUST be odd.",
    "trap_type": "Parity Case Omission",
    "trap_description": "Assuming y must be even or odd, rather than realizing 50y is ALWAYS even regardless of y.",
    "hack_solution": "Test y = 0: x = 69 (odd). Test y = 1: x = 119 (odd). x is always odd. Then x + 2y = odd + even = odd.",
    "rule_takeaway": "Even * Integer = Even. Even + Odd = Odd.",
    "difficulty_rating": 2
  },
  {
    "id": 100,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 15,
    "type": "single",
    "text": "A team won 60% of its games in the first half. In the second half, it played 20 games and won 3. If the team won 50% of the games total last year, what was the total number of games played?",
    "options": [
      "A: 60",
      "B: 70",
      "C: 80",
      "D: 90",
      "E: 100"
    ],
    "correct": "D: 90",
    "explanation": "1. Let g = 1st half games. Wins = 0.60g.\n2. Total games = g + 20, total wins = 0.60g + 3.\n3. 0.60g + 3 = 0.50(g + 20) => 0.60g + 3 = 0.50g + 10 => 0.10g = 7 => g = 70.\n4. Total games = 70 + 20 = 90.",
    "trap_type": "First Half Games vs Total Games Misidentification",
    "trap_description": "Stopping at g = 70 (Choice B) and failing to add the 20 second-half games.",
    "hack_solution": "Back-solve: If Total = 90, 1st half = 70. Wins = 0.60(70) + 3 = 42 + 3 = 45 wins out of 90 = 50%!",
    "rule_takeaway": "Always verify whether the question asks for the initial quantity or total combined quantity.",
    "difficulty_rating": 3
  },
  {
    "id": 101,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 16,
    "type": "multiple",
    "text": "Of 1,150 people, x percent chose brand D. If x rounded to the nearest integer is 3, which could be the number of people who chose D?\n\nSelect ALL that apply.",
    "options": [
      "A: 20",
      "B: 25",
      "C: 30",
      "D: 35",
      "E: 40",
      "F: 45",
      "G: 50"
    ],
    "correct": [
      "C: 30",
      "D: 35",
      "E: 40"
    ],
    "explanation": "1. x rounded to 3 => 2.5 <= x < 3.5.\n2. x = (N / 1150) * 100 = N / 11.5.\n3. 2.5 * 11.5 <= N < 3.5 * 11.5 => 28.75 <= N < 40.25.\n4. Valid integers for N are 29 through 40. Options in range: 30, 35, 40.",
    "trap_type": "Rounding Inequality Boundary Error",
    "trap_description": "Using 3.0 <= x <= 3.4 or forgetting that values from 2.5 up to 3.5 round to 3.",
    "hack_solution": "2.5% of 1150 = 28.75. 3.5% of 1150 = 40.25. Select choices between 28.75 and 40.25: 30, 35, 40.",
    "rule_takeaway": "Rounding an integer to n means the exact value satisfies n - 0.5 <= x < n + 0.5.",
    "difficulty_rating": 3
  },
  {
    "id": 102,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 17,
    "type": "single",
    "text": "b_k = \\frac{1}{k} - \\frac{1}{k+1}. What is the sum of the first 100 terms of the sequence, b_1 + b_2 + ... + b_{100}?",
    "options": [
      "A: 99/100",
      "B: 100/101",
      "C: 101/100",
      "D: 1/100",
      "E: 1/101"
    ],
    "correct": "B: 100/101",
    "explanation": "1. Sum = (1 - 1/2) + (1/2 - 1/3) + ... + (1/100 - 1/101).\n2. Intermediate terms cancel: 1 - 1/101 = 100/101.",
    "trap_type": "Telescoping Series Brute Force Miscalculation",
    "trap_description": "Trying to compute individual fractions or missing cancellation pattern.",
    "hack_solution": "Test n = 2: (1-1/2) + (1/2-1/3) = 2/3. For n terms, sum = n / (n+1). For 100 terms: 100 / 101.",
    "rule_takeaway": "In a telescoping sum sum_{k=1}^n (a_k - a_{k+1}), internal terms cancel, leaving a_1 - a_{n+1}.",
    "difficulty_rating": 3
  },
  {
    "id": 103,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 18,
    "type": "numeric",
    "text": "If |x + 1| <= 5 and |y - 1| <= 5, what is the least possible value of xy?",
    "options": [],
    "correct": [
      "-36"
    ],
    "explanation": "1. |x + 1| <= 5 => -6 <= x <= 4.\n2. |y - 1| <= 5 => -4 <= y <= 6.\n3. Least product xy: (-6) * (6) = -36.",
    "trap_type": "Product Extremum Signs Error",
    "trap_description": "Selecting x = -6 and y = -4 (giving +24) or x = 4 and y = 6 (giving +24), forgetting negative * positive gives a smaller (more negative) product.",
    "hack_solution": "Bounds: x in [-6, 4], y in [-4, 6]. Corner products: (-6)(-4)=24, (-6)(6)=-36, (4)(-4)=-16, (4)(6)=24. Minimum = -36.",
    "rule_takeaway": "To minimize a product of bounded real numbers, test all combinations of interval endpoints.",
    "difficulty_rating": 3
  },
  {
    "id": 104,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 19,
    "type": "single",
    "text": "The revenue of City B from 1990 to 1995 decreased by 15 percent, and from 1995 to 2000 increased by 15 percent. If the revenue in 1990 was $800,000, what was the revenue in 2000?",
    "options": [
      "A: $800,000",
      "B: $782,000",
      "C: $765,000",
      "D: $680,000",
      "E: $650,000"
    ],
    "correct": "B: $782,000",
    "explanation": "1. Revenue in 1995 = $800,000 * 0.85 = 680,000.\n2. Revenue in 2000 = $680,000 * 1.15 = 782,000.\nNet multiplier: 0.85 * 1.15 = 0.9775. $800,000 * 0.9775 = $782,000.",
    "trap_type": "Equal Opposite Percent Cancellation Fallacy",
    "trap_description": "Assuming a 15% decrease followed by a 15% increase returns the value to original $800,000 (Choice A).",
    "hack_solution": "Net change = 1 - (0.15)^2 = 0.9775. 800,000 * 0.9775 = 782,000.",
    "rule_takeaway": "An x% decrease followed by an x% increase always results in a net decrease of (x/100)^2 percent.",
    "difficulty_rating": 2
  },
  {
    "id": 105,
    "test": "GRE PowerPrep",
    "section": 1,
    "num": 20,
    "type": "multiple",
    "text": "If x, y, z are positive numbers such that 3x < 2y < 4z, which of the following could be true?\n\nSelect ALL that apply.",
    "options": [
      "A: x = y",
      "B: y = z",
      "C: y > z",
      "D: x > z"
    ],
    "correct": [
      "B: y = z",
      "C: y > z",
      "D: x > z"
    ],
    "explanation": "\u2022 Option A (x = y): 3x < 2x => 3 < 2 (impossible for positive x).\n\u2022 Option B (y = z): Let y=1, z=1 => 2y=2, 4z=4. Pick x=0.5 => 1.5 < 2 < 4 (True!).\n\u2022 Option C (y > z): Let z=1, y=1.5 => 2y=3, 4z=4. Pick x=0.5 => 1.5 < 3 < 4 (True!).\n\u2022 Option D (x > z): Let z=1, x=1.1, y=1.8 => 3x=3.3, 2y=3.6, 4z=4 => 3.3 < 3.6 < 4 (True!).",
    "trap_type": "Coefficient Ratio Over-Constraint Trap",
    "trap_description": "Assuming 3x < 2y < 4z forces x < y < z, ignoring that coefficients (3, 2, 4) alter the relative bounds of x, y, and z.",
    "hack_solution": "Test x=y => 3x < 2x (impossible!). For y=z, test y=z=1, x=0.5 => 1.5 < 2 < 4 (works!). For y>z, test z=1, y=1.5, x=0.5 => 1.5 < 3 < 4 (works!). For x>z, test z=1, x=1.1, y=1.8 => 3.3 < 3.6 < 4 (works!).",
    "rule_takeaway": "In 'COULD be true' inequality problems with coefficients, construct specific numerical counterexamples to test validity.",
    "difficulty_rating": 4
  }
];

if (typeof window !== 'undefined') {
  window.questions = questions;
}
