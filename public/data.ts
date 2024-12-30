export const allExams = {
  exams: [
    {
      courseTitle: "Introduction to Image Recognition",
      courseCode: "IR101",
      examDuration: 60,
      questions: [
        {
          id: 1,
          question: "What animal is this?",
          imageUrls: ["https://example.com/images/lion.jpg"],
          options: [
            { text: "Lion", imageUrls: ["https://example.com/images/lion-option.jpg"] },
            { text: "Tiger", imageUrls: ["https://example.com/images/tiger-option.jpg"] },
            { text: "Elephant", imageUrls: ["https://example.com/images/elephant-option.jpg"] }
          ],
          correctAnswers: ["Lion"],
          userAnswers: [],
          questionType: "single" // Single choice question
        },
        {
          id: 2,
          question: "Which of these shapes are circles?",
          imageUrls: ["https://example.com/images/shapes.jpg"],
          options: [
            { text: "Circle 1", imageUrls: ["https://example.com/images/circle1.jpg"] },
            { text: "Square", imageUrls: ["https://example.com/images/square.jpg"] },
            { text: "Circle 2", imageUrls: ["https://example.com/images/circle2.jpg"] }
          ],
          correctAnswers: ["Circle 1", "Circle 2"],
          userAnswers: [],
          questionType: "multiple" // Multiple choice question
        },
        {
          id: 3,
          question: "Is this a picture of a cat?",
          imageUrls: ["https://example.com/images/cat.jpg"],
          options: [
            { text: "True", imageUrls: [] },
            { text: "False", imageUrls: [] }
          ],
          correctAnswers: ["True"],
          userAnswers: [],
          questionType: "boolean" // Boolean question
        },
        {
          id: 4,
          question: "What type of tree is this?",
          imageUrls: ["https://example.com/images/tree.jpg"],
          options: [
            { text: "Oak", imageUrls: ["https://example.com/images/oak.jpg"] },
            { text: "Pine", imageUrls: ["https://example.com/images/pine.jpg"] },
            { text: "Maple", imageUrls: ["https://example.com/images/maple.jpg"] }
          ],
          correctAnswers: ["Oak"],
          userAnswers: [],
          questionType: "single" // Single choice question
        },
        {
          id: 5,
          question: "Select all the fruits in the image.",
          imageUrls: ["https://example.com/images/fruits.jpg"],
          options: [
            { text: "Apple", imageUrls: ["https://example.com/images/apple.jpg"] },
            { text: "Carrot", imageUrls: ["https://example.com/images/carrot.jpg"] },
            { text: "Banana", imageUrls: ["https://example.com/images/banana.jpg"] },
            { text: "Grapes", imageUrls: ["https://example.com/images/grapes.jpg"] }
          ],
          correctAnswers: ["Apple", "Banana", "Grapes"],
          userAnswers: [],
          questionType: "multiple" // Multiple choice question
        }
      ]
    },



    {
      courseTitle: "Basic Programming Concepts",
      courseCode: "CS101",
      examDuration: 75,
      questions: [
        {
          id: 1,
          question: "What is the result of 2 + 2?",
          imageUrls: [],
          options: [
            { text: "4", imageUrls: [] },
            { text: "5", imageUrls: [] },
            { text: "6", imageUrls: [] }
          ],
          correctAnswers: ["4"],
          userAnswers: [],
          questionType: "single"
        },
        {
          id: 2,
          question: "Which of these is a valid variable declaration in JavaScript?",
          imageUrls: [],
          options: [
            { text: "let x = 10;", imageUrls: [] },
            { text: "var = 10;", imageUrls: [] },
            { text: "int x = 10;", imageUrls: [] }
          ],
          correctAnswers: ["let x = 10;"],
          userAnswers: [],
          questionType: "single"
        },
        {
          id: 3,
          question: "Is the following code a valid JavaScript function?",
          imageUrls: ["https://example.com/images/js-function.jpg"],
          options: [
            { text: "True", imageUrls: [] },
            { text: "False", imageUrls: [] }
          ],
          correctAnswers: ["True"],
          userAnswers: [],
          questionType: "boolean"
        },
        {
          id: 4,
          question: "Which of these keywords are used in JavaScript to define variables?",
          imageUrls: [],
          options: [
            { text: "let", imageUrls: [] },
            { text: "define", imageUrls: [] },
            { text: "var", imageUrls: [] },
            { text: "function", imageUrls: [] }
          ],
          correctAnswers: ["let", "var"],
          userAnswers: [],
          questionType: "multiple"
        },
        {
          id: 5,
          question: "Which of these are programming languages?",
          imageUrls: [],
          options: [
            { text: "JavaScript", imageUrls: [] },
            { text: "HTML", imageUrls: [] },
            { text: "Python", imageUrls: [] },
            { text: "CSS", imageUrls: [] }
          ],
          correctAnswers: ["JavaScript", "Python"],
          userAnswers: [],
          questionType: "multiple"
        }
      ]
    },


    {
      courseTitle: "History of the World",
      courseCode: "HIS101",
      examDuration: 90,
      questions: [
        {
          id: 1,
          question: "Who was the first president of the United States?",
          imageUrls: [],
          options: [
            { text: "George Washington", imageUrls: [] },
            { text: "Thomas Jefferson", imageUrls: [] },
            { text: "Abraham Lincoln", imageUrls: [] }
          ],
          correctAnswers: ["George Washington"],
          userAnswers: [],
          questionType: "single"
        },
        {
          id: 2,
          question: "When was the Declaration of Independence signed?",
          imageUrls: [],
          options: [
            { text: "1776", imageUrls: [] },
            { text: "1789", imageUrls: [] },
            { text: "1800", imageUrls: [] }
          ],
          correctAnswers: ["1776"],
          userAnswers: [],
          questionType: "single"
        },
        {
          id: 3,
          question: "Was the French Revolution in the 18th century?",
          imageUrls: [],
          options: [
            { text: "True", imageUrls: [] },
            { text: "False", imageUrls: [] }
          ],
          correctAnswers: ["True"],
          userAnswers: [],
          questionType: "boolean"
        },
        {
          id: 4,
          question: "Which of these were ancient civilizations?",
          imageUrls: [],
          options: [
            { text: "Roman Empire", imageUrls: [] },
            { text: "Mayan Civilization", imageUrls: [] },
            { text: "Viking Empire", imageUrls: [] },
            { text: "Sumerians", imageUrls: [] }
          ],
          correctAnswers: ["Roman Empire", "Mayan Civilization", "Sumerians"],
          userAnswers: [],
          questionType: "multiple"
        },
        {
          id: 5,
          question: "Select all the events related to World War II.",
          imageUrls: [],
          options: [
            { text: "D-Day", imageUrls: [] },
            { text: "The Battle of Gettysburg", imageUrls: [] },
            { text: "Pearl Harbor Attack", imageUrls: [] },
            { text: "The Fall of Berlin Wall", imageUrls: [] }
          ],
          correctAnswers: ["D-Day", "Pearl Harbor Attack"],
          userAnswers: [],
          questionType: "multiple"
        }
      ]
    }



  ]
}