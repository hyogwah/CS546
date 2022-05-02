let myForm = document.getElementById("myForm");
let textInput = document.getElementById("text_input");
let errorDiv = document.getElementById("error");
let myUl = document.getElementById("list");

function isPrime(n) {
  // this algo to find a prime number was pulled from
  // https://www.geeksforgeeks.org/prime-numbers/
  if (typeof n != "number") {
    throw `404 not a number`;
  } else if (n <= 1) {
    throw `must be greater than 1`;
  } else if (Number.isInteger(n) == false) {
    throw `number must be integer`;
  } else {
    if (n <= 1)
      // Corner case
      return false;
    // Check from 2 to n-1
    for (let i = 2; i < n; i++) if (n % i == 0) return false;
    return true;
  }
}

if (myForm) {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      if (textInput.value) {
        // if (Number.isInteger(parseFloat(textInput.value)) == false) {
        //   throw `number must be integer`;
        // }
        const parsedValue = parseInt(textInput.value);
        if (typeof parsedValue != "number") {
          throw `number must be numbers`;
        }
        if (parsedValue <= 1) {
          errorDiv.hidden = false;
          errorDiv.innerHTML = "ERROR: Input must not be negative, 0, or 1.";
          return;
        }
        errorDiv.hidden = true;
        if (isPrime(parsedValue) == true) {
          //number is prime
          let li = document.createElement("li");
          li.innerHTML = parsedValue + " is a prime number";
          li.classList.add("is-prime");
          myUl.append(li);
          myForm.reset();
          textInput.focus();
        } else {
          //number is not prime
          let li = document.createElement("li");
          li.innerHTML = parsedValue + " is NOT a prime number";
          li.classList.add("not-prime");
          myUl.append(li);
          myForm.reset();
          textInput.focus();
        }
      } else {
        errorDiv.hidden = false;
        errorDiv.innerHTML = "ERROR: Input must be a valid integer.";
        myForm.reset();
        textInput.focus();
      }
    } catch (e) {
      const message = typeof e === "string" ? e : e.message;
      errorDiv.hidden = false;
      errorDiv.innerHTML = message;
    }
  });
}
