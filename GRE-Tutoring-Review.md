# 🎯 Elite GRE Quantitative Strategy & Pattern Review

> **Tutor's Note:** The GRE Quantitative section is a test of logic, trap detection, and pattern recognition—not algebraic stamina. The test-makers design every question with a specific cognitive trap to penalize mechanical textbook solvers, and a 30-to-60 second "hack" that rewards strategic thinkers. Below is your high-yield tactical breakdown of the 8 missed questions from your practice test.

---

### Question #4
* **The Trap:** The "Symmetry & Range" Illusion. The test-makers bait you into looking at both frequency distributions and thinking: *"Both distributions are symmetric and span from 10 to 50, so their spread and standard deviation must be equal."* This trick traps students into picking Choice C.
* **The Hack:** Visualize standard deviation as physical distance from the center fulcrum ($30$). 
  - Distribution C has its heaviest mass stacked right in the center ($30$), pulling the average distance down.
  - Distribution D has a U-shaped distribution with its heaviest mass pushed out to the extreme outer boundaries ($10$ and $50$).
  - **More mass at the extreme boundaries = greater standard deviation automatically.** Zero math required. Quantity B is greater.
* **The Rule:** Standard deviation is distance from the mean; pushing data points to the extreme edges maximizes standard deviation.

---

### Question #7
* **The Trap:** The "Exponent Base Multiplier" Trap. When faced with $(5^{5x})(25) = 5^n$, textbook solvers get bogged down in exponent laws and accidentally multiply coefficients, leading to trap options like Choice C ($5x + 5$).
* **The Hack:** **Number Plugging (Pick $x = 0$).**
  - Plug in $x = 0$ directly into the equation:  
    $$(5^0)(25) = (1)(25) = 25 = 5^2 \implies n = 2$$
  - Now plug $x = 0$ into the answer choices to see which outputs $2$:
    - A: $5(0) + 1 = 1$
    - **B: $5(0) + 2 = 2$** ← *BOOM! Done in 10 seconds.*
    - C: $5(0) + 5 = 5$
* **The Rule:** When variables appear in both the problem and the answer choices, pick $x = 0$ or $x = 1$ to eliminate algebra instantly.

---

### Question #8
* **The Trap:** The "Stopped-Short / Union" Distractor. The test-makers set multiple intermediate traps here:
  - Choice D ($93$) is the number of judges who ARE women or minority (the Union). Unwary test-takers stop here and select D.
  - Choice B ($81$) is the distractor from incorrect double-subtraction.
* **The Hack:** Quick Mental Venn Diagram:
  - Women = $30\% \text{ of } 180 = 54$.
  - Minority = $25\% \text{ of } 180 = 45$.
  - Overlap (Both) = $\frac{1}{9} \text{ of } 54 = 6$.
  - Total in at least one group = $54 + 45 - 6 = 93$.
  - **"Neither" Group:** Total minus Union = $180 - 93 = 87$.
* **The Rule:** "Neither" always equals $\text{Total} - (\text{Group A} + \text{Group B} - \text{Overlap})$. Never stop at the Union!

---

### Question #10
* **The Trap:** The "Root Index Confusion" Trap. Given $\sqrt[3]{x} = 3$ and $x = \sqrt{y}$, test-takers who rush accidentally treat $\sqrt[3]{x} = 3$ as a square root, getting $x = 9$, and then $y = 9^2 = 81$. The test-makers intentionally place $81$ as the main distractor trap.
* **The Hack:** Work backwards using powers of 3:
  - Cube root of $x$ is $3 \implies x = 3^3 = 27$ (NOT 9!).
  - Square root of $y$ is $x \implies \sqrt{y} = 27 \implies y = 27^2$.
  - Recognize that $27^2 = (3^3)^2 = 3^6 = 729$.
* **The Rule:** $\sqrt[3]{x} = 3$ means $x = 3^3 = 27$. Always double-check radical indices ($\sqrt{}$ vs $\sqrt[3]{}$).

---

### Question #12
* **The Trap:** The "Negative Exponent Inequality" Panic. When solving $\frac{1}{2^{1-k}} < \frac{1}{8}$, the combination of fractions, negative signs, and inequalities makes test-takers panic and default to Choice D ("Cannot be determined").
* **The Hack:** **Test the Boundary Value ($k = -2$) and Neighbors.**
  - Plug in $k = -2$: $\frac{1}{2^{1 - (-2)}} = \frac{1}{2^3} = \frac{1}{8}$. This is the exact boundary equality point.
  - Test $k = -1$ (larger than $-2$): $\frac{1}{2^{1 - (-1)}} = \frac{1}{2^2} = \frac{1}{4}$ (Fails, $\frac{1}{4} > \frac{1}{8}$).
  - Test $k = -3$ (smaller than $-2$): $\frac{1}{2^{1 - (-3)}} = \frac{1}{2^4} = \frac{1}{16}$ (Works, $\frac{1}{16} < \frac{1}{8}$).
  - Therefore, $k$ MUST be smaller than $-2$. Quantity A ($k$) is strictly less than Quantity B ($-2$). Quantity B is greater!
* **The Rule:** In Quantitative Comparison inequalities, test the threshold value and neighbor integers to determine the inequality direction without flipping signs algebraically.

---

### Question #18
* **The Trap:** The "Fixed Coefficient Fallacy". Test-takers see $9 = 3^2$ and $8 = 2^3$ and assume: *"Since 9 and 8 each have 1 prime factor, $9n$ and $8n$ must always have the same number of prime factors."* This tricks people into picking Choice C.
* **The Hack:** **Extreme Number Testing (Test $n = 1, 2, 3$).**
  - Try $n = 1$: $9(1)=9 \implies \{3\}$ (1 prime factor); $8(1)=8 \implies \{2\}$ (1 prime factor). → *Quantities Equal*
  - Try $n = 2$: $9(2)=18 \implies \{2, 3\}$ (2 prime factors); $8(2)=16 \implies \{2\}$ (1 prime factor). → *Quant A Greater*
  - **Instant Choice D:** As soon as two valid test inputs yield different comparisons (Equal vs. Greater), choose **D** immediately.
* **The Rule:** In Quant Comparison with a variable $n$, always test $n = 1$ and $n = 2$. If the outcome changes, lock in Choice D.

---

### Question #22
* **The Trap:** The "Unknown Variable Hesitation". Test-takers see an unknown variable $n$ in a remainder question and assume that because $n$ isn't specified, the remainder must be variable, leading them to pick Choice D.
* **The Hack:** **Modulo Property Recognition / Quick Sample.**
  - **Property:** $10$ is a multiple of $5$ ($10 = 5 \times 2$). Adding any multiple of 5 to $n$ adds $0$ to the remainder.
  - **Quick Sample:** Pick $n = 1$:
    - Quant A: Remainder of $1 \div 5 = 1$.
    - Quant B: Remainder of $(1 + 10) = 11 \div 5 = 1$.
  - Pick $n = 7$:
    - Quant A: Remainder of $7 \div 5 = 2$.
    - Quant B: Remainder of $17 \div 5 = 2$.
  - Both quantities are always identical. Choice C!
* **The Rule:** Adding any multiple of the divisor $d$ to $n$ leaves the remainder modulo $d$ completely unchanged.

---

### Question #27
* **The Trap:** The "Individual Variable Solvability" Trap. List L has 3 numbers ($2, x, y$) and List M has 5 numbers ($1, 2, 3, x, y$). Unprepared test-takers try to solve for $x$ and $y$ individually, realize they can't, and leave the question blank.
* **The Hack:** **Dummy Number Substitution.**
  - If the average of $(2, x, y)$ is $\frac{10}{3}$, then the sum is $2 + x + y = 10 \implies x + y = 8$.
  - **Pick dummy values that satisfy $x + y = 8$:** Set $x = 8$ and $y = 0$!
  - List M becomes: $1, 2, 3, 8, 0$.
  - Sum of List M = $1 + 2 + 3 + 8 + 0 = 14$.
  - Average of List M = $\frac{14}{5} = 2.8$ or $\frac{14}{5}$.
* **The Rule:** Never try to solve for individual variables if only their sum $(x + y)$ is needed. Pick simple dummy numbers (e.g. $x = 8, y = 0$) to solve in seconds.
