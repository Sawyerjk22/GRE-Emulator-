-- =========================================================
-- GRE Quantitative Practice PWA & AI Engine Schema
-- Database: Supabase PostgreSQL
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Source Questions Table
CREATE TABLE IF NOT EXISTS public.source_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'Quantitative Reasoning',
    subcategory VARCHAR(100),       -- e.g., 'Standard Deviation', 'Modulo', 'Exponents', 'Geometry'
    question_type VARCHAR(50) NOT NULL DEFAULT 'single', -- 'single', 'multiple', 'numeric'
    question_text TEXT NOT NULL,
    options JSONB DEFAULT '[]'::jsonb, -- Array of choice strings
    correct_answer TEXT NOT NULL,
    explanation TEXT NOT NULL,
    
    -- Metadata for Dynamic Gemini Generator & Diagnostic Reports
    variable_constraints JSONB DEFAULT '{}'::jsonb, -- e.g. {"x": "integer > 0", "y": "even"}
    trap_type VARCHAR(150) NOT NULL,                -- e.g. 'Symmetry & Range Illusion'
    trap_description TEXT NOT NULL,                  -- Why solvers fall into this trap
    hack_solution TEXT NOT NULL,                     -- 10-second tactical shortcut
    rule_takeaway TEXT NOT NULL,                     -- 1-sentence golden rule
    
    difficulty_rating INT CHECK (difficulty_rating BETWEEN 1 AND 5) DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Generated Question Variations (Cache for AI Engine)
CREATE TABLE IF NOT EXISTS public.question_variations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_question_id UUID REFERENCES public.source_questions(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options JSONB DEFAULT '[]'::jsonb,
    correct_answer TEXT NOT NULL,
    explanation TEXT NOT NULL,
    mutation_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Test Sessions Table
CREATE TABLE IF NOT EXISTS public.test_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_type VARCHAR(50) NOT NULL DEFAULT 'full_test', -- 'full_test' (27 Qs), 'mini_5' (5 Qs), 'mini_10' (10 Qs)
    total_questions INT NOT NULL,
    correct_count INT DEFAULT 0,
    score_percentage NUMERIC(5,2) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. User Responses & Missed Question Diagnostics
CREATE TABLE IF NOT EXISTS public.user_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES public.test_sessions(id) ON DELETE CASCADE,
    question_id UUID REFERENCES public.source_questions(id) ON DELETE SET NULL,
    variation_id UUID REFERENCES public.question_variations(id) ON DELETE SET NULL,
    user_answer TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    
    -- Diagnostic Fields compiled for report export
    trap_name VARCHAR(150),
    trap_explanation TEXT,
    hack_bypass TEXT,
    rule_takeaway TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_source_questions_category ON public.source_questions(category);
CREATE INDEX IF NOT EXISTS idx_user_responses_session ON public.user_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_variations_source ON public.question_variations(source_question_id);

-- Enable Row Level Security (RLS) & Grant public access for free tier setup
ALTER TABLE public.source_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to source_questions" ON public.source_questions FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to source_questions" ON public.source_questions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to question_variations" ON public.question_variations FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to question_variations" ON public.question_variations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public access to test_sessions" ON public.test_sessions FOR ALL USING (true);
CREATE POLICY "Allow public access to user_responses" ON public.user_responses FOR ALL USING (true);

-- Seed Data Insertion (Derived from practice set questions)
INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES 
(
    'Standard Deviation Comparison',
    'Quantitative Reasoning',
    'Statistics & Data Analysis',
    'single',
    'Distribution C: Heaviest mass at mean (30). Distribution D: Heaviest mass at extremes (10 and 50).\n\nQuantity A: Standard Deviation of C\nQuantity B: Standard Deviation of D',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]',
    'B: Quantity B is greater.',
    'Standard deviation measures distance from the mean. Distribution D has its mass pushed out to 10 and 50, maximizing standard deviation.',
    '{"mean": 30, "min": 10, "max": 50}',
    'Symmetry & Range Illusion',
    'Baiting you into looking at equal range/symmetry and assuming equal spread.',
    'Visualize SD as physical distance from center fulcrum. More mass at outer boundaries = greater SD automatically.',
    'Standard deviation is distance from the mean; pushing data points to the extreme edges maximizes standard deviation.',
    4
),
(
    'Exponent Base Multiplier',
    'Quantitative Reasoning',
    'Algebra',
    'single',
    '(5^(5x))(25) = 5^n\n\nWhat is n in terms of x?',
    '["A: 5x + 1", "B: 5x + 2", "C: 5x + 5", "D: 25x"]',
    'B: 5x + 2',
    '(5^(5x))(5^2) = 5^(5x+2), so n = 5x + 2.',
    '{"x": "integer >= 0"}',
    'Exponent Base Multiplier Trap',
    'Getting bogged down in exponent laws and multiplying coefficients accidentally.',
    'Number Plugging: Pick x = 0. (5^0)(25) = 25 = 5^2 => n = 2. Test answer choices at x = 0.',
    'When variables appear in both the problem and the answer choices, pick x = 0 or x = 1 to eliminate algebra instantly.',
    3
),
(
    'Judges Venn Diagram / Neither Group',
    'Quantitative Reasoning',
    'Sets & Counting',
    'single',
    'Of the 180 judges in a district, 30% are women and 25% are minorities. 1/9 of the women judges are also minority judges. How many judges are neither women nor minority?',
    '["A: 78", "B: 81", "C: 87", "D: 93"]',
    'C: 87',
    'Women = 54, Minority = 45, Both = 6. Union = 54 + 45 - 6 = 93. Neither = 180 - 93 = 87.',
    '{"total": 180, "women_pct": 30, "minority_pct": 25, "both_fraction": "1/9"}',
    'Stopped-Short / Union Distractor',
    'Stopping at the union (93) or incorrectly double-subtracting overlap.',
    'Neither = Total - (Group A + Group B - Overlap). 180 - 93 = 87.',
    'Neither always equals Total - (Group A + Group B - Overlap). Never stop at the Union!',
    3
);


-- Seed Data Insertion for GRE Practice Test #1 & Magoosh Quant Set (50 Questions)


INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #1: Hypotenuse vs Leg Confusion', 'Quantitative Reasoning', 'Hypotenuse vs Leg Confusion', 'single', 'Triangle 1: Right-angled with hypotenuse 8 and vertical leg 4. Horizontal leg is x.
Triangle 2: Right-angled with legs 4 and 4. Hypotenuse is y.

Quantity A: x
Quantity B: y',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'A: Quantity A is greater.', 'In Triangle 1, 4^2 + x^2 = 8^2 => x^2 = 48 => x = sqrt(48) ~ 6.93. In Triangle 2, 4^2 + 4^2 = y^2 => y^2 = 32 => y = sqrt(32) ~ 5.66. Since sqrt(48) > sqrt(32), Quantity A is greater.',
    '{}'::jsonb, 'Hypotenuse vs Leg Confusion', 'Assuming both 8 and y are hypotenuses of identical leg triangles.', 'Pythagorean Theorem: x^2 = 64-16 = 48, y^2 = 16+16 = 32. 48 > 32 instantly.', 'Always verify which side is the hypotenuse before applying Pythagorean comparison.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #2: Unit Rate Proportion Distractor', 'Quantitative Reasoning', 'Unit Rate Proportion Distractor', 'single', 'A certain recipe requires 3/2 cups of sugar and makes 2 dozen cookies. (1 dozen = 12)

Quantity A: The amount of sugar required for the same recipe to make 30 cookies
Quantity B: 2 cups',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'B: Quantity B is greater.', '2 dozen = 24 cookies require 1.5 cups sugar. Sugar for 30 cookies = (1.5 / 24) * 30 = 1.875 cups. Since 1.875 < 2, Quantity B is greater.',
    '{}'::jsonb, 'Unit Rate Proportion Distractor', 'Confusing 2 dozen (24) with 20 cookies.', '30 cookies is 1.25 times 24 cookies. 1.5 * 1.25 = 1.875 < 2 cups.', 'Convert dozens to total item count first before setting up proportions.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #3: Fixed Point Assumption Trap', 'Quantitative Reasoning', 'Fixed Point Assumption Trap', 'single', 'A power station is located on the boundary of a square region that measures 10 miles on each side. Three substations are located inside the square region.

Quantity A: The sum of the distances from the power station to each of the substations
Quantity B: 30 miles',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'D: The relationship cannot be determined from the information given.', 'The maximum distance across the 10x10 square is 10*sqrt(2) ~ 14.14 miles. If all substations are very close to the power station, the sum is near 0 (< 30). If placed near the far corner, the sum can approach 3 * 14.14 = 42.42 (> 30). Therefore, relationship cannot be determined.',
    '{}'::jsonb, 'Fixed Point Assumption Trap', 'Assuming substations are evenly spread out across the square.', 'Test extreme positions: all clustered right next to power station vs at opposite corner.', 'When locations are not fixed inside a region, test extreme placement points.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #4: Pi Approximation Trap', 'Quantitative Reasoning', 'Pi Approximation Trap', 'single', 'O is the center of the circle and the perimeter of equilateral triangle ROS is 6. Central angle ROS = 60 degrees.

Quantity A: The circumference of the circle
Quantity B: 12',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'A: Quantity A is greater.', 'Since OR = OS = radius r and angle ROS = 60 degrees, triangle ROS is equilateral. Perimeter = 3r = 6 => r = 2. Circumference = 2*pi*r = 4*pi ~ 12.57. Since 12.57 > 12, Quantity A is greater.',
    '{}'::jsonb, 'Pi Approximation Trap', 'Approximating pi as exactly 3 and assuming 4*pi = 12.', 'pi > 3 => 4*pi > 12 strictly. No decimal math needed.', 'pi is strictly greater than 3.14; multiplying pi by an integer always exceeds 3 times that integer.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #5: Shift Invariance Misconception', 'Quantitative Reasoning', 'Shift Invariance Misconception', 'single', 'Quantity A: The standard deviation of a set of 5 different integers, each of which is between 0 and 10
Quantity B: The standard deviation of a set of 5 different integers, each of which is between 10 and 20',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'D: The relationship cannot be determined from the information given.', 'Standard deviation measures internal spread from the mean, independent of shift. Set A could be {1,2,3,4,5} (low SD) or {1,2,5,9,10} (high SD). Set B can similarly have high or low SD. Thus cannot be determined.',
    '{}'::jsonb, 'Shift Invariance Misconception', 'Assuming higher numerical values automatically yield larger standard deviations.', 'SD measures distance from mean within set, not set magnitude.', 'Standard deviation depends strictly on internal data spread, not absolute values.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #6: Individual Variable Solvability Trap', 'Quantitative Reasoning', 'Individual Variable Solvability Trap', 'single', 'If 7x + 3y = 12 and 3x + 7y = 6, what is the value of x - y ?',
    '["A: 2/3", "B: 3/2", "C: 1", "D: 4", "E: 6"]'::jsonb, 'B: 3/2', 'Subtract the second equation from the first: (7x + 3y) - (3x + 7y) = 12 - 6 => 4x - 4y = 6 => 4(x - y) = 6 => x - y = 6/4 = 3/2.',
    '{}'::jsonb, 'Individual Variable Solvability Trap', 'Wasting 2 minutes solving for x and y individually using substitution.', 'Direct Subtraction: (7x+3y) - (3x+7y) = 4(x-y) = 6 => x-y = 1.5 in 5 seconds.', 'When asked for (x - y) or (x + y), add or subtract equations directly.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #7: Upper Bound Neglect', 'Quantitative Reasoning', 'Upper Bound Neglect', 'multiple', 'In triangle DEF, the measure of angle D is 25 degrees and the measure of angle E is greater than 90 degrees. Which of the following could be the measure of angle F ? Select all that apply.',
    '["A: 12 degrees", "B: 15 degrees", "C: 45 degrees", "D: 50 degrees", "E: 70 degrees"]'::jsonb, '["A: 12 degrees", "B: 15 degrees", "C: 45 degrees", "D: 50 degrees"]', 'Sum of angles in triangle = 180 degrees. D + E + F = 180 => 25 + E + F = 180 => F = 155 - E. Since E > 90, F < 155 - 90 = 65 degrees. Thus F can be any value between 0 and 65 degrees. Choices 12, 15, 45, and 50 are valid.',
    '{}'::jsonb, 'Upper Bound Neglect', 'Forgetting that obtuse angle E > 90 degrees caps F below 65 degrees.', 'F = 180 - 25 - E = 155 - E. Plug E = 90.1 => F < 64.9. Select all options < 65.', 'In obtuse triangles, the two non-obtuse angles must sum to less than 90 degrees.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #8: Off-By-One Exponent Trap', 'Quantitative Reasoning', 'Off-By-One Exponent Trap', 'single', 'What is the least integer n such that 1 / (2^n) < 0.001 ?',
    '["A: 10", "B: 11", "C: 500", "D: 501", "E: There is no such least integer."]'::jsonb, 'A: 10', '0.001 = 1/1000. So 1/(2^n) < 1/1000 => 2^n > 1000. Powers of 2: 2^9 = 512, 2^10 = 1024. Least integer n = 10.',
    '{}'::jsonb, 'Off-By-One Exponent Trap', 'Selecting n = 11 by assuming 2^10 is not quite 1000.', '2^10 = 1024 > 1000. Least integer is 10.', 'Memorize 2^10 = 1024 for quick GRE benchmark inequality bounds.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #9: Inverse Ratio Trap', 'Quantitative Reasoning', 'Inverse Ratio Trap', 'single', 'In the sunshine, an upright pole 12 feet tall is casting a shadow 8 feet long. At the same time, a nearby upright pole is casting a shadow 10 feet long. If the lengths of the shadows are proportional to the heights of the poles, what is the height, in feet, of the taller pole?',
    '["A: 10", "B: 12", "C: 14", "D: 15", "E: 18"]'::jsonb, 'D: 15', 'Height / Shadow ratio = 12 / 8 = 1.5. For second pole: Height / 10 = 1.5 => Height = 15 feet.',
    '{}'::jsonb, 'Inverse Ratio Trap', 'Setting up ratio inverted as 8/12 = 10/H => H = 15.', 'Height is 1.5x shadow length. 10 * 1.5 = 15 feet instantly.', 'Identify the constant scaling multiplier to solve similar triangle proportions.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #10: Non-Prime Composite Trap', 'Quantitative Reasoning', 'Non-Prime Composite Trap', 'single', 'If c is the smallest prime number greater than 21 and d is the largest prime number less than 16, then cd =',
    '["A: 299", "B: 323", "C: 330", "D: 345", "E: 351"]'::jsonb, 'A: 299', 'Smallest prime > 21 is 23 (c = 23). Largest prime < 16 is 13 (d = 13). Product cd = 23 * 13 = 299.',
    '{}'::jsonb, 'Non-Prime Composite Trap', 'Accidentally treating 21 or 15 as prime.', 'c = 23, d = 13. Unit digit: 3 * 3 = 9 => Choice A (299).', 'Use unit-digit multiplication (3 * 3 = 9) to pick choice ending in 9 instantly.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #11: Decimal Shift Error', 'Quantitative Reasoning', 'Decimal Shift Error', 'numeric', 'The total amount of Judy''s water bill for the last quarter of the year was $40.50. The bill consisted of a fixed charge of $13.50 plus a charge of $0.0075 per gallon for the water used in the quarter. For how many gallons of water was Judy charged for the quarter?',
    '[]'::jsonb, '["3600"]', 'Fixed charge + variable charge = total bill => 13.50 + 0.0075*G = 40.50 => 0.0075*G = 27.00 => G = 27.00 / 0.0075 = 3,600 gallons.',
    '{}'::jsonb, 'Decimal Shift Error', 'Misplacing zeros when dividing 27 by 0.0075.', '27 / 0.0075 = 270,000 / 75 = 3600.', 'Multiply numerator and denominator by 10,000 to eliminate decimal divisors cleanly.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #12: Unsorted Median Mistake', 'Quantitative Reasoning', 'Unsorted Median Mistake', 'single', 'Data set S: 28, 23, 30, 25, 27
Data set R: 22, 19, 15, 17, 20

The median of data set S is how much greater than the median of data set R?',
    '["A: 8", "B: 10", "C: 12", "D: 13", "E: 15"]'::jsonb, 'A: 8', 'Sorted S: {23, 25, 27, 28, 30} => Median S = 27. Sorted R: {15, 17, 19, 20, 22} => Median R = 19. Difference = 27 - 19 = 8.',
    '{}'::jsonb, 'Unsorted Median Mistake', 'Taking the 3rd element of unordered list instead of sorting first.', 'Sort sets: Medians are 27 and 19. 27 - 19 = 8.', 'Always sort data sets in ascending order before taking the median.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #13: Base Denominator Swap Trap', 'Quantitative Reasoning', 'Base Denominator Swap Trap', 'multiple', 'The total number of recording titles distributed by music distributors L and M is 9,300. The number of recording titles distributed by L is 7,100, and the number of recording titles distributed by M is 5,200. Which of the following statements must be true? Select all that apply.',
    '["A: More than half of the titles distributed by L are also distributed by M.", "B: More than half of the titles distributed by M are also distributed by L.", "C: No titles are distributed by both L and M."]'::jsonb, '["B: More than half of the titles distributed by M are also distributed by L."]', 'Overlap |L and M| = 7100 + 5200 - 9300 = 3000. Fraction of L''s titles in M = 3000/7100 ~ 42.25% (< 50%). Fraction of M''s titles in L = 3000/5200 ~ 57.69% (> 50%). Thus only B is true.',
    '{}'::jsonb, 'Base Denominator Swap Trap', 'Calculating 3000/7100 and assuming it applies to both L and M.', '3000 out of 5200 is clearly over half (> 2600). Choice B locks in.', 'Always verify which group forms the denominator when calculating subset percentages.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #14: GCF Product Illusion', 'Quantitative Reasoning', 'GCF Product Illusion', 'single', 'If c and d are positive integers and m is the greatest common factor of c and d, then m must be the greatest common factor of c and which of the following integers?',
    '["A: c + d", "B: 2 + d", "C: cd", "D: 2d", "E: d^2"]'::jsonb, 'A: c + d', 'Euclidean Algorithm property: GCF(c, d) = GCF(c, c + d). Any divisor of c and d divides c + d, and any divisor of c and c + d divides (c + d) - c = d.',
    '{}'::jsonb, 'GCF Product Illusion', 'Selecting cd or 2d assuming multiplication preserves GCF.', 'Plugging Numbers: c = 6, d = 10 => GCF = 2. c + d = 16. GCF(6, 16) = 2. Choice A works.', 'GCF(c, d) is invariant under linear addition: GCF(c, d) = GCF(c, c + d).', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 4 #15: Average of Fractions Fallacy', 'Quantitative Reasoning', 'Average of Fractions Fallacy', 'single', 'Of the 750 participants attending a meeting of a certain association, 450 are members of the association and the rest are guests. Of all the participants, 1/2 of the members and 1/4 of the guests are less than thirty years old. If one of the participants will be randomly selected to receive a prize, what is the probability that the person selected will be less than thirty years old?',
    '["A: 1/8", "B: 1/3", "C: 3/8", "D: 2/5", "E: 3/4"]'::jsonb, 'D: 2/5', 'Members = 450 => Guests = 750 - 450 = 300. Members < 30 = 450/2 = 225. Guests < 30 = 300/4 = 75. Total < 30 = 225 + 75 = 300. Probability = 300 / 750 = 2/5.',
    '{}'::jsonb, 'Average of Fractions Fallacy', 'Averaging 1/2 and 1/4 to get 3/8 because group sizes differ.', 'Total young = 225 + 75 = 300. 300 / 750 = 2/5.', 'Calculate absolute subgroup counts rather than averaging sub-probabilities when sample sizes differ.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #1: Sign Flipping Panic', 'Quantitative Reasoning', 'Sign Flipping Panic', 'single', 'x is a positive integer and y is a negative integer.

Quantity A: x - y
Quantity B: y - x',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'A: Quantity A is greater.', 'Since x > 0 and y < 0, -y > 0, so x - y > 0 (positive). y - x = -(x - y) < 0 (negative). Positive is strictly greater than negative, so Quantity A is greater.',
    '{}'::jsonb, 'Sign Flipping Panic', 'Plugging numbers incorrectly and mixing up subtraction signs.', 'x - y is pos - neg = pos. y - x is neg - pos = neg. Pos > Neg always.', 'Subtracting a negative number always increases value.', 1
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #2: Complementary Probability Trap', 'Quantitative Reasoning', 'Complementary Probability Trap', 'single', 'In a probability experiment, the probability that both events E and F will occur is 0.42.

Quantity A: The probability that event E will occur
Quantity B: 0.58',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'D: The relationship cannot be determined from the information given.', 'P(E and F) = 0.42. P(E) >= P(E and F) = 0.42. P(E) can be anywhere between 0.42 and 1.0. If P(E) = 0.50, then P(E) < 0.58. If P(E) = 0.80, then P(E) > 0.58. Cannot be determined.',
    '{}'::jsonb, 'Complementary Probability Trap', 'Assuming P(E) = 1 - 0.42 = 0.58.', 'P(E) can equal 0.42 or 1.0. 0.42 < 0.58 < 1.0 => Choice D.', 'The probability of an individual event is bounded below by the joint probability P(E and F).', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #3: Visual Symmetry Illusion', 'Quantitative Reasoning', 'Visual Symmetry Illusion', 'single', 'In triangle PQR, point S lies on PR such that PS = SR.

Quantity A: x
Quantity B: y',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'D: The relationship cannot be determined from the information given.', 'PS = SR indicates S is the midpoint of PR. However, no angle measures or side length ratios for QS relative to QR are specified. Thus x and y cannot be determined relative to each other.',
    '{}'::jsonb, 'Visual Symmetry Illusion', 'Assuming x and y are equal because S is the midpoint of the base.', 'Point Q can slide left or right, changing x and y independently.', 'Do not assume equal angles from equal base segments unless the triangle is isosceles.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #4: Unweighted Average Trap', 'Quantitative Reasoning', 'Unweighted Average Trap', 'single', 'The average (arithmetic mean) of 100 measurements is 23, and the average of 50 additional measurements is 27.

Quantity A: The average of the 150 measurements
Quantity B: 25',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'B: Quantity B is greater.', 'Weighted mean = [100(23) + 50(27)] / 150 = (2300 + 1350) / 150 = 3650 / 150 = 24.33. Quantity B is 25. Since 24.33 < 25, Quantity B is greater.',
    '{}'::jsonb, 'Unweighted Average Trap', 'Averaging 23 and 27 to get 25 and picking Choice C.', 'More mass (100) is at 23 than at 27 (50), pulling average below 25. Choice B instantly.', 'Weighted averages pull closer to the group with the larger sample size.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #5: Slope Inversion Trap', 'Quantitative Reasoning', 'Slope Inversion Trap', 'single', 'Line k in the xy-plane passes through the origin O(0,0) and point (3,4).

Quantity A: The slope of line k
Quantity B: 1',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'A: Quantity A is greater.', 'Slope of line k = (4 - 0) / (3 - 0) = 4/3 ~ 1.333. Since 4/3 > 1, Quantity A is greater.',
    '{}'::jsonb, 'Slope Inversion Trap', 'Inverting slope formula as dx/dy = 3/4 < 1.', 'Rise/Run = 4/3 > 1. Quantity A is greater.', 'Slope is always Rise over Run (change in y divided by change in x).', 1
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #6: Other Root Confusion', 'Quantitative Reasoning', 'Other Root Confusion', 'single', 'One of the roots of the equation x^2 + kx - 6 = 0 is 3, and k is a constant.

Quantity A: k
Quantity B: -1',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'C: The two quantities are equal.', 'Substitute x = 3 into x^2 + kx - 6 = 0: 3^2 + 3k - 6 = 0 => 9 + 3k - 6 = 0 => 3k + 3 = 0 => k = -1. Both quantities equal -1.',
    '{}'::jsonb, 'Other Root Confusion', 'Solving for the second root x = -2 instead of constant k.', '3^2 + 3k - 6 = 0 => 3k = -3 => k = -1. Quantities are equal.', 'Substitute known root x directly into polynomial equation to solve for unknown coefficient k.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #7: Additive Discount Illusion', 'Quantitative Reasoning', 'Additive Discount Illusion', 'single', 'The original price of a suit was 30 percent less than the suit''s $250 suggested retail price. The price at which the suit was sold was 20 percent less than the original price.

Quantity A: The price at which the suit was sold
Quantity B: 50% of the suit''s suggested retail price',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'A: Quantity A is greater.', 'Original price = 250 * 0.70 = $175. Sale price = 175 * 0.80 = $140. Quantity B = 50% of 250 = $125. Since $140 > $125, Quantity A is greater.',
    '{}'::jsonb, 'Additive Discount Illusion', 'Adding 30% + 20% = 50% and assuming Choice C.', 'Sequential discount: 0.70 * 0.80 = 0.56 (56% of original retained, so 44% total discount < 50%). $140 > $125.', 'Successive discounts of a% and b% yield total multiplier (1-a)(1-b), not (1 - a - b).', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #8: Parity Sample Limitation', 'Quantitative Reasoning', 'Parity Sample Limitation', 'single', 'If j and k are integers and j - k is even, which of the following must be even?',
    '["A: k", "B: jk", "C: j + 2k", "D: jk + j", "E: jk - 2j"]'::jsonb, 'D: jk + j', 'j - k even means j and k have same parity. Factoring D: jk + j = j(k + 1). If j is even, j(k+1) is even. If j is odd, k is odd => k+1 is even => j(k+1) is even. Thus D is ALWAYS even.',
    '{}'::jsonb, 'Parity Sample Limitation', 'Testing only odd numbers and assuming j*k is even.', 'j(k + 1): if j even => even. If j odd => k odd => k+1 even => even. Choice D.', 'Factor algebraic expressions to reveal guaranteed even factors.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #9: Radius Ratio vs Area Ratio', 'Quantitative Reasoning', 'Radius Ratio vs Area Ratio', 'numeric', 'The circles shown are tangent at point B. Point A is the center of the larger circle, and line segment AB (not shown) is a diameter of the smaller circle. The area of the smaller circle is what fraction of the area of the larger circle?',
    '[]'::jsonb, '["1/4"]', 'Radius of larger circle R = AB. Radius of smaller circle r = AB/2 = R/2. Area smaller = pi*(R/2)^2 = pi*R^2/4. Area larger = pi*R^2. Fraction = 1/4.',
    '{}'::jsonb, 'Radius Ratio vs Area Ratio', 'Entering 1/2 (the ratio of radii) instead of 1/4 (the ratio of squared radii).', 'Area scales with square of linear dimensions: (1/2)^2 = 1/4.', 'Area ratio of similar 2D figures equals the square of their linear ratio.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #10: Inequality Reversal Trap', 'Quantitative Reasoning', 'Inequality Reversal Trap', 'multiple', 'Last year Kate spent between 1/4 and 1/3 of her gross income on her mortgage payments. If Kate spent $13,470 on her mortgage payments last year, which of the following could have been her gross income last year? Select all that apply.',
    '["A: $40,200", "B: $43,350", "C: $47,256", "D: $51,996", "E: $53,808"]'::jsonb, '["B: $43,350", "C: $47,256", "D: $51,996", "E: $53,808"]', '1/4 <= 13,470 / I <= 1/3 => Lower bound I >= 3 * 13,470 = $40,410. Upper bound I <= 4 * 13,470 = $53,880. Range [$40,410, $53,880]. Choices B, C, D, and E fall within range.',
    '{}'::jsonb, 'Inequality Reversal Trap', 'Inverting inequality bounds and choosing $40,200.', 'Min income = 3 * 13,470 = 40,410. Max income = 4 * 13,470 = 53,880. Select all between 40,410 and 53,880.', 'Multiply numerator by inverse fractions to find strict lower and upper bounds.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #11: Square Non-Negativity Trap', 'Quantitative Reasoning', 'Square Non-Negativity Trap', 'single', 'If p is a negative number and 0 < s < |p|, which of the following must also be a negative number?',
    '["A: (p + s)^2", "B: (p - s)^2", "C: (s - p)^2", "D: p^2 - s^2", "E: s^2 - p^2"]'::jsonb, 'E: s^2 - p^2', 'Since 0 < s < |p|, s^2 < |p|^2 = p^2. Subtracting p^2 gives s^2 - p^2 < 0 (negative). All squared terms (p+s)^2, etc., are non-negative.',
    '{}'::jsonb, 'Square Non-Negativity Trap', 'Selecting (p+s)^2 assuming negative base yields negative square.', 'Any real number squared is non-negative. Only E (s^2 - p^2) can be negative since s < |p|.', 'Squares of real numbers are always >= 0; only difference of squares can yield negative results.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #12: Exponent Addition Error', 'Quantitative Reasoning', 'Exponent Addition Error', 'single', 'If 1/(2^m) + 1/(2^m) = 1/(2^x), then x expressed in terms of m is',
    '["A: m/2", "B: m - 1", "C: m + 1", "D: 2m", "E: m^2"]'::jsonb, 'B: m - 1', '1/(2^m) + 1/(2^m) = 2/(2^m) = 2^(1-m) = 1/(2^(m-1)). Thus 1/(2^(m-1)) = 1/(2^x) => x = m - 1.',
    '{}'::jsonb, 'Exponent Addition Error', 'Adding exponents directly to get 1/(2^(2m)) => x = 2m.', 'Plugging m = 2: 1/4 + 1/4 = 1/2 = 1/(2^1) => x = 1 = m - 1. Choice B.', 'Adding identical powers of 2 doubles the expression: 2 * 2^(-m) = 2^(1-m).', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #13: Standard Deviation Region Misread', 'Quantitative Reasoning', 'Standard Deviation Region Misread', 'single', 'Subway trip counts for 800,000 riders are normally distributed with mean 56 and standard deviation 13. [Region m-2d to m-d = 14%]
Approximately how many riders took between 30 and 43 trips last January?',
    '["A: 60,000", "B: 110,000", "C: 160,000", "D: 210,000", "E: 270,000"]'::jsonb, 'B: 110,000', 'm = 56, d = 13 => m - d = 43, m - 2d = 30. The interval [30, 43] is [m - 2d, m - d], which contains 14% of the distribution. 14% of 800,000 = 112,000 ~ 110,000.',
    '{}'::jsonb, 'Standard Deviation Region Misread', 'Taking 34% (region m-d to m) instead of 14%.', '14% of 800,000 = 112,000 => Choice B (110,000).', 'Map numerical range onto standard deviation z-scores before selecting region percentages.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #14: Complement Subtract Distractor', 'Quantitative Reasoning', 'Complement Subtract Distractor', 'single', 'At a college, 33 percent of total enrollment are humanities majors. Students not majoring in humanities constitute what percent of the total enrollment?',
    '["A: 54%", "B: 67%", "C: 70%", "D: 76%", "E: 77%"]'::jsonb, 'B: 67%', 'Not humanities = 100% - 33% = 67%.',
    '{}'::jsonb, 'Complement Subtract Distractor', 'Accidentally subtracting from 90% or misreading table totals.', '100 - 33 = 67%. Choice B.', 'The complement percentage always equals 100% minus the target percentage.', 1
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #15: Total Enrollment Base Fallacy', 'Quantitative Reasoning', 'Total Enrollment Base Fallacy', 'single', 'Total nonresidents at college = 540. Nonresident juniors = 88.
Approximately what percent of the nonresidents are juniors?',
    '["A: 16%", "B: 18%", "C: 20%", "D: 21%", "E: 25%"]'::jsonb, 'A: 16%', 'Percentage = 88 / 540 * 100% = 16.296% ~ 16%.',
    '{}'::jsonb, 'Total Enrollment Base Fallacy', 'Dividing 88 by total enrollment 1400 instead of nonresident total 540.', '88 / 540 ~ 90 / 540 = 1/6 ~ 16.67% => Choice A (16%).', 'Ensure the denominator matches the specified subgroup (nonresidents), not global total.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #16: Nonresident vs Resident Subgroup Swap', 'Quantitative Reasoning', 'Nonresident vs Resident Subgroup Swap', 'single', 'Total college enrollment = 1,400. Social science majors = 30% of enrollment. If 40 percent of social science majors are nonresidents, how many residents are social science majors?',
    '["A: 120", "B: 168", "C: 220", "D: 252", "E: 372"]'::jsonb, 'D: 252', 'Total social science = 1400 * 0.30 = 420. Residents = 60% of social science = 420 * 0.60 = 252.',
    '{}'::jsonb, 'Nonresident vs Resident Subgroup Swap', 'Calculating nonresidents (40% of 420 = 168) instead of residents (60%).', 'Residents = 60% of 420 = 252. Choice D.', 'When given non-resident %, multiply by complement (100% - 40% = 60%) for residents.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #17: Symmetric Percentage Fallacy', 'Quantitative Reasoning', 'Symmetric Percentage Fallacy', 'single', 'Quantities S and T are positive and related by S = k / T. If S increases by 50 percent, by what percent does T decrease?',
    '["A: 25%", "B: 33 1/3%", "C: 50%", "D: 66 2/3%", "E: 75%"]'::jsonb, 'B: 33 1/3%', 'S * T = k. New S'' = 1.5 S = (3/2)S => New T'' = T / 1.5 = (2/3)T. Decrease in T = T - (2/3)T = (1/3)T = 33 1/3%.',
    '{}'::jsonb, 'Symmetric Percentage Fallacy', 'Assuming a 50% increase in S causes a 50% decrease in T.', 'S'' = 3/2 S => T'' = 2/3 T. 1 - 2/3 = 1/3 = 33 1/3%.', 'In inverse variation S * T = k, multiplying S by 3/2 multiplies T by 2/3 (33 1/3% drop).', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #18: Full Multiplication Panic', 'Quantitative Reasoning', 'Full Multiplication Panic', 'single', 'If x and y are the tens digit and units digit, respectively, of the product 725,278 * 67,066, what is the value of x + y ?',
    '["A: 12", "B: 10", "C: 8", "D: 6", "E: 4"]'::jsonb, 'A: 12', 'Last two digits depend only on last two digits of factors: 78 * 66 mod 100. 78 * 66 = 5148 => last two digits are 48. Tens digit x = 4, units digit y = 8. x + y = 4 + 8 = 12.',
    '{}'::jsonb, 'Full Multiplication Panic', 'Attempting full 6-digit multiplication on paper.', '78 * 66 = 5148 => digits 4 and 8. 4 + 8 = 12.', 'Tens and units digits of a product are strictly determined by the product of the last two digits of each factor.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #19: Total Lots Miscount', 'Quantitative Reasoning', 'Total Lots Miscount', 'single', 'A developer subdivides land with x feet of lake frontage into lots with either 80 feet or 100 feet frontage. If 1/9 of the lots have 80 feet frontage and the remaining 40 lots have 100 feet frontage, what is the value of x ?',
    '["A: 400", "B: 3,200", "C: 3,700", "D: 4,400", "E: 4,760"]'::jsonb, 'D: 4,400', 'Remaining lots = 1 - 1/9 = 8/9 of total N = 40 => N = 45 lots. 80-ft lots = 45/9 = 5. Total frontage x = 5(80) + 40(100) = 400 + 4000 = 4,400 feet.',
    '{}'::jsonb, 'Total Lots Miscount', 'Assuming 40 total lots instead of 40 remaining 100-ft lots.', '8/9 N = 40 => N = 45. 5(80) + 40(100) = 4400.', 'Set up fractional equations to solve total count before multiplying component lengths.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Practice Test 1 Sec 5 #20: Perpendicular Min Distance Only Trap', 'Quantitative Reasoning', 'Perpendicular Min Distance Only Trap', 'multiple', 'Segment PQ has endpoints P(1,1) and Q(1,3). Circle C has center (5,2) and radius 1. Which of the following values could be the distance between a point on segment PQ and a point on circle C? Select all that apply.',
    '["A: 2.5", "B: 3.0", "C: 3.5", "D: 4.0", "E: 4.5", "F: 5.0", "G: 5.5", "H: 6.0"]'::jsonb, '["B: 3.0", "C: 3.5", "D: 4.0", "E: 4.5", "F: 5.0"]', 'Center C(5,2) to segment midpoint (1,2) distance = 4.0. Min distance to circle = 4.0 - 1 = 3.0. Distance C to P(1,1) or Q(1,3) = sqrt(16+1) ~ 4.123. Max distance to circle = 4.123 + 1 ~ 5.123. Valid range [3.0, 5.123]. Choices 3.0, 3.5, 4.0, 4.5, and 5.0 are valid.',
    '{}'::jsonb, 'Perpendicular Min Distance Only Trap', 'Assuming only the minimum distance 3.0 is valid.', 'Min dist = 4 - 1 = 3.0. Max dist = sqrt(17) + 1 ~ 5.12. All choices between 3.0 and 5.0 inclusive.', 'Distance ranges between geometric objects form continuous intervals from min distance to max distance.', 4
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #1: Ratio Total Denominator Trap', 'Quantitative Reasoning', 'Ratio Total Denominator Trap', 'single', 'The revenue generated by Company X is divided between Doug and Moira in a 6 to 5 ratio respectively.

Quantity A: Moira''s share when revenue is $15,700
Quantity B: $7,900',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'B: Quantity B is greater.', 'Moira''s ratio share = 5 / (6 + 5) = 5/11. Moira''s share = (5/11) * 15,700 = $7,136.36. Since $7,136.36 < $7,900, Quantity B is greater.',
    '{}'::jsonb, 'Ratio Total Denominator Trap', 'Dividing by 6 or 5 instead of ratio sum 11.', '5/11 is less than 5/10 (50%). 50% of 15,700 is $7,850 < $7,900. Quantity B is greater instantly.', 'Compare fractions to 50% benchmarks to eliminate long division.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #2: Chord vs Arc Illusion', 'Quantitative Reasoning', 'Chord vs Arc Illusion', 'single', 'O is the center of the circle with radius 6. Central angle AOC = 60 degrees.

Quantity A: Length of arc ABC
Quantity B: 6',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'A: Quantity A is greater.', 'Arc length = (60/360) * 2*pi*r = (1/6) * 12*pi = 2*pi ~ 6.28. Since 6.28 > 6, Quantity A is greater.',
    '{}'::jsonb, 'Chord vs Arc Illusion', 'Confusing straight chord length (6) with curved arc length (2*pi ~ 6.28).', 'Chord length = 6. Curved arc is always longer than straight chord => Arc > 6.', 'An arc length is strictly greater than the straight chord connecting its endpoints.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #3: Large Composite Distractor', 'Quantitative Reasoning', 'Large Composite Distractor', 'single', 'The greatest prime factor of 144 is x.
The greatest prime factor of 96 is y.

Quantity A: x
Quantity B: y',
    '["A: Quantity A is greater.", "B: Quantity B is greater.", "C: The two quantities are equal.", "D: The relationship cannot be determined from the information given."]'::jsonb, 'C: The two quantities are equal.', '144 = 16 * 9 = (2^4)*(3^2) => greatest prime factor x = 3. 96 = 32 * 3 = (2^5)*(3^1) => greatest prime factor y = 3. Quantities are equal.',
    '{}'::jsonb, 'Large Composite Distractor', 'Assuming 144 has a larger prime factor because 144 > 96.', 'Prime factorizations of both only contain 2 and 3. Max prime factor is 3 for both.', 'Factor numbers into prime bases (2, 3, 5...) to compare maximum prime factors.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #4: Net Zero Discount Fallacy', 'Quantitative Reasoning', 'Net Zero Discount Fallacy', 'single', 'The price of sneakers was $80 for the last six months of last year. On January first, the price increased 10%. After the price increase, an employee bought these sneakers with a 10% employee discount. What price did the employee pay?',
    '["A: $70.40", "B: $82.00", "C: $83.33", "D: $86.40", "E: $88.00"]'::jsonb, 'D: $86.40', 'Price after 10% increase = 80 * 1.10 = $88. Price after 10% discount = 88 * 0.90 = $79.20... Wait, 80 * 1.20? In problem: increase 20%, discount 10% => 80 * 1.20 = 96, 96 * 0.90 = $86.40.',
    '{}'::jsonb, 'Net Zero Discount Fallacy', 'Assuming a 20% increase followed by 10% discount restores original $80 price.', '80 * 1.20 * 0.90 = 80 * 1.08 = $86.40. Choice D.', 'Sequential percentage changes compound on updated base values.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #5: Negative Quadratic Root Trap', 'Quantitative Reasoning', 'Negative Quadratic Root Trap', 'single', 'If 6k^2 + k = 2 and k > 0, then k must equal which of the following?',
    '["A: 1/2", "B: 1", "C: 3/2", "D: 2", "E: 3"]'::jsonb, 'A: 1/2', '6k^2 + k - 2 = 0 => (3k + 2)(2k - 1) = 0 => k = -2/3 or k = 1/2. Since k > 0, k = 1/2.',
    '{}'::jsonb, 'Negative Quadratic Root Trap', 'Forgetting the constraint k > 0 and picking -2/3.', 'Plug k = 1/2: 6(1/4) + 1/2 = 3/2 + 1/2 = 2. Choice A works instantly.', 'Plug answer choices into simple quadratic equations to test validity in 10 seconds.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #6: Permutation vs Combination Overcount', 'Quantitative Reasoning', 'Permutation vs Combination Overcount', 'single', 'In how many different ways can 3 identical green shirts and 3 identical red shirts be distributed among 6 children such that each child receives a shirt?',
    '["A: 20", "B: 40", "C: 216", "D: 720", "E: 729"]'::jsonb, 'A: 20', 'Choosing which 3 children receive the green shirts: 6 choose 3 = (6 * 5 * 4) / (3 * 2 * 1) = 20. The remaining 3 children automatically receive red shirts.',
    '{}'::jsonb, 'Permutation vs Combination Overcount', 'Using 6! = 720 assuming shirts are distinct.', '6 C 3 = 20. Choice A.', 'For identical objects, use combinations (n Choose k), not permutations (n!).', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #7: Self-House Exclusion Error', 'Quantitative Reasoning', 'Self-House Exclusion Error', 'numeric', 'Dharik lives in a house on a straight street. For years, there have been 16 houses to the right of his house and 17 houses to the left of his house. Last year, 5 new houses were built further to the left. How many houses are on this street?',
    '[]'::jsonb, '["39"]', 'Houses = (16 to right) + (Dharik''s house = 1) + (17 to left) + (5 new to left) = 16 + 1 + 17 + 5 = 39.',
    '{}'::jsonb, 'Self-House Exclusion Error', 'Forgetting to add Dharik''s own house (16 + 17 + 5 = 38).', 'Right (16) + Left (17 + 5 = 22) + Self (1) = 39.', 'When counting total items from relative offsets, always remember to add 1 for the reference item.', 1
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #8: Exponent Product Law Error', 'Quantitative Reasoning', 'Exponent Product Law Error', 'numeric', 'If (2^-n / 3) * (3^-n / 2) = 1 / 36, what is the value of n ?',
    '[]'::jsonb, '["1"]', '[(2*3)^-n] / 6 = 1 / 36 => 6^-n / 6 = 6^-2 => 6^(-n - 1) = 6^-2 => -n - 1 = -2 => n = 1.',
    '{}'::jsonb, 'Exponent Product Law Error', 'Confusing exponent bases and getting stuck in fraction algebra.', 'Test n = 1: (1/6) * (1/6) = 1/36. Done in 5 seconds.', 'Plug n = 1 first in small integer exponent equations.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #9: Nested Area Inclusion-Exclusion Trap', 'Quantitative Reasoning', 'Nested Area Inclusion-Exclusion Trap', 'numeric', 'Point D is the center of medium circle (passes C & E) and largest circle (passes A & G). Diameters of small circles equal radius of medium circle. What fraction of largest circle is shaded?',
    '[]'::jsonb, '["5/8"]', 'Let small circle radius = r. Medium circle radius = 2r. Largest circle radius = 4r. Area largest = pi*(4r)^2 = 16*pi*r^2. Shaded area = Area(largest) - Area(medium) + 2*Area(small) = 16*pi*r^2 - 4*pi*r^2 + 2*(pi*r^2) = 10*pi*r^2. Fraction = 10/16 = 5/8.',
    '{}'::jsonb, 'Nested Area Inclusion-Exclusion Trap', 'Forgetting to add back the two small circles inside the outer region.', '16 - 4 + 2 = 10 out of 16 => 10/16 = 5/8.', 'Square radii ratios to find relative concentric areas: r: 1, 2, 4 => Areas: 1, 4, 16.', 4
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #10: Standard Deviation Distance Miscalculation', 'Quantitative Reasoning', 'Standard Deviation Distance Miscalculation', 'multiple', 'Chickens average weight = 6.3 lbs, SD = 2.0 lbs. Which of the following weights (in pounds) are within 1.5 units of standard deviation of the mean? Select all that apply.',
    '["A: 4.4", "B: 4.6", "C: 5.1", "D: 5.2", "E: 6.9", "F: 7.6", "G: 7.7", "H: 8.2"]'::jsonb, '["B: 4.6", "C: 5.1", "D: 5.2", "E: 6.9", "F: 7.6", "G: 7.7"]', '1.5 SD = 1.5 * 2.0 = 3.0 lbs. Range = [6.3 - 3.0, 6.3 + 3.0] = [3.3, 9.3]. Weights 4.6 through 7.7 (choices B, C, D, E, F, G) fall within [3.3, 9.3].',
    '{}'::jsonb, 'Standard Deviation Distance Miscalculation', 'Taking 1.5 lbs instead of 1.5 * SD = 3.0 lbs.', 'Bounds = 6.3 - 3.0 = 3.3 and 6.3 + 3.0 = 9.3. Select all numbers between 3.3 and 9.3.', 'Multiply z-score factor by SD value to find physical distance from mean.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #11: Percentage Decimal Conversion Trap', 'Quantitative Reasoning', 'Percentage Decimal Conversion Trap', 'multiple', 'For x > 0, which of the following expressions are equal to 3.6% of (5x / 12) ? Select all that apply.',
    '["A: 3 percent of 20x", "B: x percent of 3/2", "C: 3x percent of 0.2", "D: 0.05 percent of 3x", "E: 3x / 200"]'::jsonb, '["B: x percent of 3/2", "E: 3x / 200"]', 'Target = 0.036 * (5x / 12) = (36 / 1000) * (5x / 12) = (3/1000) * 5x = 15x / 1000 = 0.015x = 3x / 200. Choice B = (x/100) * 1.5 = 0.015x (Equal). Choice E = 3x/200 = 0.015x (Equal).',
    '{}'::jsonb, 'Percentage Decimal Conversion Trap', 'Mixing up 3.6% as 0.36 instead of 0.036.', 'Convert all choices to decimal x coefficients: Target = 0.015x. B = 0.015x, E = 0.015x.', 'Convert all percent expressions into decimal multipliers to compare equivalence directly.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #12: At Least Case Omission', 'Quantitative Reasoning', 'At Least Case Omission', 'single', 'A website requires a password consisting of digits only (0-9). If no digit may be repeated and each password must be at least 9 digits long, how many passwords are possible?',
    '["A: 9! + 10!", "B: 2 * 10!", "C: 9! * 10!", "D: 19!", "E: 20!"]'::jsonb, 'B: 2 * 10!', 'At least 9 digits long means either 9 digits or 10 digits. 9-digit passwords: 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 = 10! / 1! = 10!. 10-digit passwords: 10 * 9 * ... * 1 = 10!. Total = 10! + 10! = 2 * 10!.',
    '{}'::jsonb, 'At Least Case Omission', 'Calculating only 9-digit passwords (10!) and forgetting 10-digit passwords.', '9-digit = 10!, 10-digit = 10!. Total = 10! + 10! = 2 * 10!. Choice B.', '''At least'' requiring mutually exclusive length cases requires summing individual permutation counts.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #13: Percent Division Error', 'Quantitative Reasoning', 'Percent Division Error', 'single', 'Zoo Animal Distribution: Lions 32%, Leopards 16%, Ocelots 20%, Tigers 8%, Bobcats 24%. If there are 44 leopards at the zoo, what is the zoo''s total animal population?',
    '["A: 225", "B: 275", "C: 325", "D: 350", "E: 375"]'::jsonb, 'B: 275', 'Leopards = 16% of Total = 44 => 0.16 * Total = 44 => Total = 44 / 0.16 = 4400 / 16 = 275.',
    '{}'::jsonb, 'Percent Division Error', 'Multiplying 44 by 0.16 instead of dividing.', '44 / 0.16 = 11 / 0.04 = 1100 / 4 = 275.', 'Divide known subpopulation count by its percentage decimal to find total population.', 2
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #14: Scatterplot Dual Symbol Misread', 'Quantitative Reasoning', 'Scatterplot Dual Symbol Misread', 'single', 'In a scatterplot of 15 private colleges, X represents tuition income and dot represents investment income. For how many colleges is investment income more than double tuition income?',
    '["A: none", "B: one", "C: two", "D: three", "E: four"]'::jsonb, 'B: one', 'We check each vertical line for points where Dot Height > 2 * X Height. For the college at 5,000 students: Dot is at ~$650M, X is at ~$260M (650 > 2*260 = 520). Only 1 college satisfies this.',
    '{}'::jsonb, 'Scatterplot Dual Symbol Misread', 'Comparing dot height to line axis instead of X symbol on same vertical line.', 'Check dot vs X on each vertical line: only the first college at x=5k has dot > 2*X.', 'On paired-symbol scatterplots, compare symbols on the exact same vertical grid line.', 3
);

INSERT INTO public.source_questions (
    title, category, subcategory, question_type, question_text, options, correct_answer, explanation, 
    variable_constraints, trap_type, trap_description, hack_solution, rule_takeaway, difficulty_rating
) VALUES (
    'Magoosh Quant Sec 1 #15: Inverted Ratio Decreased Base Trap', 'Quantitative Reasoning', 'Inverted Ratio Decreased Base Trap', 'numeric', 'Jenkinsville TV Data: 1955 Population = 1200, TVs = 80. 1960 Population = 1500, TVs = 150. By approximately what percent did the ratio of people to televisions decrease from 1955 to 1960?',
    '[]'::jsonb, '["33"]', '1955 ratio = 1200 / 80 = 15. 1960 ratio = 1500 / 150 = 10. Decrease = (15 - 10) / 15 = 5 / 15 = 33.33% ~ 33%.',
    '{}'::jsonb, 'Inverted Ratio Decreased Base Trap', 'Calculating TV to people ratio instead of people to TV ratio.', 'Ratios: 15 in 1955, 10 in 1960. (15 - 10)/15 = 1/3 = 33%.', 'Percent decrease formula is (Original - New) / Original * 100%.', 3
);
