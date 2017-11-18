let formData = document.getElementById('palindromeForm');

formData.addEventListener('submit', function(e) {
    e.preventDefault();

    let palindromeValue = document.getElementById('palindromText').value;
    if (palindromeValue != '') {
        let liValue = document.createElement('li');
        let isPlaindromeCheck = (palindromeValue) => {
            if (palindromeValue === undefined || typeof(palindromeValue) !== "string") {
                alert("Provide input String");
            }
            palindromeValue = palindromeValue.toLowerCase().replace(/[^a-z0-9]+/ig, "");
            let initial = 0,
                last = palindromeValue.length - 1;
            while (initial <= last) {
                if (palindromeValue.charAt(initial) !== palindromeValue.charAt(last)) {
                    return false;
                    break;
                }
                initial++;
                last--;
            }
            return true;
        }
        let check = isPlaindromeCheck(palindromeValue);
        let text = document.createTextNode(palindromeValue);
        if (check) {
            liValue.className = 'is-palindrome';
            liValue.append(text);
            document.getElementById('palindromList').appendChild(liValue);

        } else {
            liValue.className = 'not-palindrome';
            liValue.append(text);
            document.getElementById('notPalindromList').appendChild(liValue);
        }




        document.getElementById('palindromText').value = "";

    } else {
        alert("Provide something to check ");
    }
});