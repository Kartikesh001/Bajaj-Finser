import express from "express";
import cors from "cors";

const app = express();


app.use(cors());
app.use(express.json());


const USER_DETAILS = {
  user_id: "kartikesh_singh_13092004", // Format: {full_name_ddmmyyyy}
  email: "kartikeshsingh2022@vitbhopal.ac.in",
  roll_number: "22BSA10321"
};


function isNumber(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}


function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}


function isSpecialCharacter(str) {
  return /^[^a-zA-Z0-9]+$/.test(str);
}


function createAlternatingCapsString(alphabets) {
  
  const reversedStrings = alphabets.map(str => str.split("").reverse().join(""));

  
  const reversedOrder = reversedStrings.reverse();

  const concatenated = reversedOrder.join("");

  
  let result = "";
  for (let i = 0; i < concatenated.length; i++) {
    result += i % 2 === 0
      ? concatenated[i].toUpperCase()   
      : concatenated[i].toLowerCase();  
  }

  return result;
}


console.log(createAlternatingCapsString(["A","ABcD","DOE"])); 




app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Validate input
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input. 'data' should be an array."
      });
    }

 
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;

    data.forEach((item) => {
      const itemStr = String(item);

      if (isNumber(itemStr)) {
        const num = parseInt(itemStr);
        sum += num;

        if (num % 2 === 0) {
          evenNumbers.push(itemStr);
        } else {
          oddNumbers.push(itemStr);
        }
      } else if (isAlphabet(itemStr)) {
        alphabets.push(itemStr.toUpperCase());
      } else if (isSpecialCharacter(itemStr)) {
        specialCharacters.push(itemStr);
      }
    });


    const concatString = createAlternatingCapsString(alphabets);

  
    const response = {
      is_success: true,
      user_id: USER_DETAILS.user_id,
      email: USER_DETAILS.email,
      roll_number: USER_DETAILS.roll_number,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: String(sum), // Return sum as string
      concat_string: concatString
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});


app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: "it is working"
  });
});


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "API is running",
    timestamp: new Date().toISOString()
  });
});


app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    error: "Route not found"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});

export default app;