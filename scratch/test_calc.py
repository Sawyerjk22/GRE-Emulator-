# Test calculator engine logic identical to app.js
import math

def format_calc_number(num):
    if not isinstance(num, (int, float)) or math.isnan(num) or math.isinf(num):
        return 'ERROR'
    if abs(num) > 99999999:
        return 'ERROR'
    
    s = f"{num:.8g}"
    if 'e' in s:
        parsed = float(s)
        if abs(parsed) > 99999999:
            return 'ERROR'
        s = str(parsed)
    clean_num = float(s)
    clean_str = str(clean_num)
    if clean_str.endswith('.0'):
        clean_str = clean_str[:-2]
    
    parts = clean_str.lstrip('-').split('.')
    if len(parts) == 2:
        max_decimals = max(0, 8 - len(parts[0]))
        clean_str = f"{clean_num:.{max_decimals}f}".rstrip('0').rstrip('.')
    return clean_str

def evaluate_tokens(tokens):
    if not tokens:
        return 0
    open_count = 0
    for t in tokens:
        if t == '(':
            open_count += 1
        elif t == ')':
            open_count = max(0, open_count - 1)
    completed = list(tokens)
    while open_count > 0:
        completed.append(')')
        open_count -= 1
    
    output_queue = []
    op_stack = []
    precedence = {'+': 1, '-': 1, '*': 2, '/': 2}
    
    for t in completed:
        if isinstance(t, (int, float)):
            output_queue.append(t)
        elif t == '(':
            op_stack.append(t)
        elif t == ')':
            while op_stack and op_stack[-1] != '(':
                output_queue.append(op_stack.pop())
            if op_stack and op_stack[-1] == '(':
                op_stack.pop()
        elif t in precedence:
            while op_stack and op_stack[-1] != '(' and precedence[op_stack[-1]] >= precedence[t]:
                output_queue.append(op_stack.pop())
            op_stack.append(t)
            
    while op_stack:
        op = op_stack.pop()
        if op not in ('(', ')'):
            output_queue.append(op)
            
    stack = []
    for item in output_queue:
        if isinstance(item, (int, float)):
            stack.append(item)
        else:
            if len(stack) < 2:
                return float('nan')
            b = stack.pop()
            a = stack.pop()
            if item == '+':
                stack.append(a + b)
            elif item == '-':
                stack.append(a - b)
            elif item == '*':
                stack.append(a * b)
            elif item == '/':
                if b == 0:
                    return 'ERROR'
                stack.append(a / b)
    if len(stack) != 1:
        return float('nan')
    return stack[0]

# Run test cases
tests = [
    ([2, '+', 3, '*', 4], 14),
    (['(', 2, '+', 3, ')', '*', 4], 20),
    ([10, '-', 4, '-', 2], 4),
    ([12, '/', 4, '/', 2], 1.5),
    ([5, '/', 0], 'ERROR'),
    ([0.1, '+', 0.2], 0.3),
    ([100, '+', 25, '*', 2], 150),
    ([100000000, '+', 1], 'ERROR')
]

all_passed = True
for tokens, expected in tests:
    res = evaluate_tokens(tokens)
    if isinstance(res, (int, float)):
        formatted = format_calc_number(res)
        exp_formatted = format_calc_number(expected) if isinstance(expected, (int, float)) else expected
        assert formatted == exp_formatted, f"Failed: {tokens} => got {formatted}, expected {exp_formatted}"
    else:
        assert res == expected, f"Failed: {tokens} => got {res}, expected {expected}"
    print(f"PASS: {tokens} => {res}")

print("\nAll math evaluator test cases passed successfully!")
