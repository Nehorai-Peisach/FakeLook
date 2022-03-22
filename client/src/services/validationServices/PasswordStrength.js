const PasswordStrength = (element, password) => {
  if (element && password.length !== 0) {
    let count = 0;

    let checks = [false, false, false, false, false];
    for (let i = 0; i < password.length; i++) {
      const x = password[i];
      if (
        x === '`' ||
        x === '~' ||
        x === '!' ||
        x === '@' ||
        x === '#' ||
        x === '$' ||
        x === '%' ||
        x === '^' ||
        x === '&' ||
        x === '*' ||
        x === '(' ||
        x === ')' ||
        x === '-' ||
        x === '_' ||
        x === '=' ||
        x === '+' ||
        x === '/' ||
        x === '.' ||
        x === ',' ||
        x === '<' ||
        x === '>' ||
        x === ';' ||
        x === ':' ||
        x === "'" ||
        x === '"' ||
        x === '{' ||
        x === '}' ||
        x === '[' ||
        x === ']' ||
        x === ' '
      ) {
        checks[0] = true;
        continue;
      }
      if (!isNaN(x)) {
        checks[1] = true;
        continue;
      }
      if (x === x.toUpperCase()) {
        checks[2] = true;
        continue;
      }
      if (x === x.toLowerCase()) {
        checks[3] = true;
        continue;
      }
    }
    if (password.length > 6) checks[4] = true;
    checks.forEach((x) => x && count++);

    if (count > 4) {
      element.className = 'strength__strong';
      element.textContent = 'Strong';
    } else if (count > 3) {
      element.className = 'strength__medium';
      element.textContent = 'Medium';
    } else {
      element.className = 'strength__week';
      element.textContent = 'Weak';
    }
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
};

export default PasswordStrength;
