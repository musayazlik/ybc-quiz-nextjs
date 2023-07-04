export default {
  quizHome: {
    title: "Quiz Time",
    description:
      "We have made the best application where you can test the relationship between you and your lover, spouse or friend.",
    keywords: "quiz, relationship, love, spouse, friend, lover, test",
    button: "Start Quiz",
    quizStatus: "Quiz Status",
    quizStatusPlaceholder: "Enter Quiz Id.",
    quizStatusButton: "Show",
  },

  quizpagep: `Your lover, spouse or friend <br /><span>to test the <span className="text-red-500  underline decoration-red-500 decoration-6">relationship</span> </span>between you and your partner.`,
  quizpagebutton: "Start a free quiz",
  quizSolve: {
    title: "Solve Quiz",
    subtitle1: "Now it's time to solve a quiz...",
    subtitle1Edit: "Now it's time to edit the quiz...",
    subtitle2:
      "This Quiz consists of multiple choice and open-ended questions.",
    button: "Start Solving Quiz",
    buttons: {
      start: "Start Solving Quiz",
      edit: "Edit Quiz",
      next: "Next",
      previous: "Previous",
      finish: "Finish",
      backHome: "Back to Home",
    },
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
          quizEditStatus: {
            title: "Quiz successfully made editable.",
            button: "Okay",
          },
        },
      },

      payment: {
        title: "Buy Premium",
        subtitle: "Please pay to see the answers to the quiz.",
        name: "Name",
        surname: "Surname",
        email: "Email",
        address: "Address",
        city: "City",
        country: "Country",
        button: "Pay",
        buttonEdit: "Edit Quiz",
      },
    },
  },
  quizCreate: {
    title: "Create Quiz",
    subtitle: "Now it's time to create a quiz...",
    subtitle2:
      "This Quiz consists of multiple choice and open-ended questions.",
    createQuiz: "Create Quiz",
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

  quizFinish: {
    title: "Quiz Finished",
    subtitle:
      "Quiz created successfully. Copy the link below to share your quiz.",
    subtitle2:
      "It will be necessary to see your partner's answers to the quiz you have created.",
    button: "Go to Home",
    copy: "Copy",
    copySuccess: "Copied!",
    copySuccessText: "Link copied to clipboard.",
    textWarning: "You can only copy the quiz once.",
  },

  quizStatus: {
    title: "Quiz Status",
    subtitle: "Enter the quiz id to see the quiz status.",
    button: "Show",
    error: {
      title: "Quiz Not Found",
      subtitle: "Sorry, this quiz was not found.",
      button: "Back to Quiz",
    },
    warning: {
      subtitle: "This quiz has not been solved yet.",
    },
    success: {
      subtitle: "Your partner answered the questions you prepared case.",
      subtitle1: "You can see the answers below.",
    },
    premium: {
      text: "To see the answers to the Classic Questions",
      textPremium: "Premium Membership",
      text2: "you need to be a premium member.",
      button: "Buy Premium Membership",
    },
  },

  ads: "Ads",
}
