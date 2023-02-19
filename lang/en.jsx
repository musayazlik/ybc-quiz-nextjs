export default {
  welcome: "Welcome...",
  start: "Start Quiz",
  quizpagep: `Your lover, spouse or friend <br /><span>to test the <span className="text-red-500  underline decoration-red-500 decoration-6">relationship</span> </span>between you and your partner.`,
  quizpagebutton: "Start a free quiz",
  quizSolve: {
    title: "Solve Quiz",
    subtitle1: "Now it's time to solve a quiz...",
    subtitle1Edit: "Now it's time to edit the quiz...",
    subtitle2:
      "This Quiz consists of multiple choice and open-ended questions.",
    button: "Start Solving Quiz",
    error: {
      title: "Quiz Not Found",
      subtitle1: "Sorry, this quiz was not found.",
      subtitle2: "Please try again later.",
      button: "Back to Quiz",
    },
    solved: {
      title: "Quiz Solved",
      subtitle: "This quiz has already been solved.",
      button: "Go to Home",
      buttonEdit: "Edit Quiz",

      alerts: {
        error: {
          title: "Error!",
          subtitle: "An error occurred. Please try again later.",
          button: "Okay",
        },
        success: {
          title: "Success!",
          subtitle: "Quiz solved successfully.",
          subtitleEdit: "Quiz edited successfully.",
          button: "Okay",
        },
      },
    },
  },
  quizCreate: {
    title: "Create Quiz",
    subtitle: "Now it's time to create a quiz...",
    subtitle2:
      "This Quiz consists of multiple choice and open-ended questions.",
    button: "Create Quiz",
    personalInformation: {
      title: "Personal Information",
      subtitle:
        "This information will be stored only for you and shared only with you.",
    },
    yourName: "Your Name",
    yourPartnerName: "Your Partner's Name",
    testQuestionPool: {
      title: "Test Question Pool",
      subtitle:
        "Select the questions you want to ask from the question pool below.",
    },
    classicQuestions: {
      title: "Classic Questions",
      subtitle: "Here you can add classic questions.",
      warning: "You can add up to 5 custom questions.",
      addQuestion: "Add",
    },
    alerts: {
      error: {
        classicMaxFied: {
          title: "Error!",
          subtitle: "You can add up to 5 custom questions.",
          button: "Okay",
        },
        allFields: {
          title: "Error!",
          subtitle: "Please fill in all fields.",
          button: "Okay",
        },
        emptyFields: {
          title: "Error!",
          subtitle:
            "You cannot add a blank question. Please add your question.",
          button: "Okay",
        },
      },
      success: {
        title: "Success!",
        subtitle: "Quiz created successfully.",
        button: "Okay",
      },
    },
  },
}
