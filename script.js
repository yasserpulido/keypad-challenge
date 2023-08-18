const keypad = [
    ["_", "A", "B", "C", "D", "_"],
    ["E", "F", "G", "H", "I", "J"],
    ["K", "L", "M", "N", "O", "P"],
    ["1", "2", "_", "_", "3", "4"],
  ];
  
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const memo = {};
  
  function isVowel(key) {
    return vowels.includes(key);
  }
  
  function countSequences(x, y, length, vowelCount) {
    if (length === 20) return 1;
    if (vowelCount > 2) return 0;
  
    const key = `${x}-${y}-${length}-${vowelCount}`;
    if (memo[key] !== undefined) return memo[key];
  
    let count = 0;
  
    // Movimientos legales diagonales
    const directions = [-1, 1];
    for (const dx of directions) {
      for (const dy of directions) {
        const newX = x + dx;
        const newY = y + dy;
  
        if (newX >= 0 && newY >= 0 && newX < 4 && newY < 6 && keypad[newX][newY] !== '_') {
          const newVowelCount = isVowel(keypad[newX][newY]) ? vowelCount + 1 : vowelCount;
          count += countSequences(newX, newY, length + 1, newVowelCount);
        }
      }
    }
  
    memo[key] = count;
    return count;
  }
  
  let total = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 6; j++) {
      if (keypad[i][j] !== '_') {
        const vowelCount = isVowel(keypad[i][j]) ? 1 : 0;
        total += countSequences(i, j, 1, vowelCount);
      }
    }
  }
  
  console.log(total); // Debería imprimir la respuesta correcta
  