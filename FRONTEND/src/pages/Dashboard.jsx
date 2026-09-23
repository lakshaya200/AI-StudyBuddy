import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [materials, setMaterials] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [flashcards, setFlashcards] = useState({});
  const [quizzes, setQuizzes] = useState({});
  const [studyPlans, setStudyPlans] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const token = localStorage.getItem("token");

  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/materials", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMaterials(data);
      }
    } catch (error) {
      console.log("Failed to fetch materials");
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleAddMaterial = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Study material added successfully!");

        setTitle("");
        setContent("");

        fetchMaterials();
      } else {
        alert(data.message || "Failed to add material");
      }
    } catch (error) {
      alert("Server connection failed");
    }
  };

  const generateSummary = async (materialId) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/summary/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            materialId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSummaries((prev) => ({
          ...prev,
          [materialId]: data.summary.summary,
        }));

        alert("AI Summary generated successfully!");
      } else {
        alert(data.message || "Failed to generate summary");
      }
    } catch (error) {
      alert("Unable to connect to the server. Please check whether the backend is running");
    }
  };

  const generateFlashcards = async (materialId) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/flashcards/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          materialId,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setFlashcards((prev) => ({
        ...prev,
        [materialId]: data.flashcards,
      }));

      alert("AI Flashcards generated successfully!");
    } else {
      alert(data.message || "Failed to generate flashcards");
    }
  } catch (error) {
    alert("Unable to connect to the server. Please check whether the backend is running");
  }
};

const generateQuiz = async (materialId) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/quiz/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          materialId,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setQuizzes((prev) => ({
        ...prev,
        [materialId]: data.quiz,
      }));

      alert("AI Quiz generated successfully!");
    } else {
      alert(data.message || "Failed to generate quiz");
    }
  } catch (error) {
    alert("Unable to connect to the server. Please check whether the backend is running");
  }
};

const generateStudyPlan = async (materialId) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/study-plan/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          materialId,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setStudyPlans((prev) => ({
        ...prev,
        [materialId]: data.studyPlan,
      }));

      alert("AI Study Plan generated successfully!");
    } else {
      alert(data.message || "Failed to generate study plan");
    }
  } catch (error) {
    alert("Unable to connect to the server. Please check whether the backend is running");
  }
};
const handleFileUpload = async (e) => {
  e.preventDefault();

  if (!selectedFile) {
    alert("Please select a file");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await fetch(
      "http://localhost:5000/api/upload/material",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Study material uploaded successfully!");
      setSelectedFile(null);
      fetchMaterials();
    } else {
      alert(data.message || "File upload failed");
    }
  } catch (error) {
    alert("Server connection failed");
  }
};

 return (
  <div className="dashboard">
   <div className="dashboard-header">
    <h1>AI StudyBuddy</h1>
    <h2>Student Dashboard</h2>
    <p>Your AI-powered learning companion</p>
    <p className="welcome-text">
  Welcome back! Continue your learning and explore your study materials.
</p>

  </div>
<div className="feature-cards">

  <div className="feature-card">
    <h3>📚 Study Materials</h3>
    <p>Add and manage your study materials.</p>
  </div>

  <div className="feature-card">
    <h3>📝 AI Summary</h3>
    <p>Generate simple summaries from your materials.</p>
  </div>

  <div className="feature-card">
    <h3>🎴 AI Flashcards</h3>
    <p>Create useful flashcards for revision.</p>
  </div>

  <div className="feature-card">
    <h3>🧠 AI Quiz</h3>
    <p>Practice your knowledge with AI-generated quizzes.</p>
  </div>

</div>
    <div className="material-section">
      <div className="dashboard-card">
      <h3>Add Study Material</h3>
      </div>
      <hr />

      <div className="dashboard-card">
        <h3>Upload Study Materials</h3>
      </div>
<div className="upload-card">
<form onSubmit={handleFileUpload}>
  <input
    type="file"
    onChange={(e) => setSelectedFile(e.target.files[0])}
  />

  <br />
  <br />

  <button type="submit">Upload File</button>
</form>
</div>

<hr />
    <div className="add-material-card">
      <form onSubmit={handleAddMaterial}>
        <input
          className="form-input"
          type="text"
          placeholder="Material title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br />
        <br />

        <textarea
          className="form-textarea"
          placeholder="Enter your study material"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
          cols="50"
          required
        />

        <br />
        <br />

        <button className="primary-button" type="submit">Add Material</button>
      </form>
    </div>
      <hr />

      <h3>My Study Materials</h3>

      {materials.length === 0 ? (
        <p>No study materials found.</p>
      ) : (
        materials.map((material) => (
          <div className="Material-card" key={material._id}>
            <h4>{material.title}</h4>

            <div className="action-buttons">

            <button onClick={() => generateSummary(material._id)}>
              Generate AI Summary
            </button>
            {flashcards[material._id] && (
  <div className="ai-result">
    <h4>AI Flashcards</h4>

    {flashcards[material._id].map((card, index) => (
      <div key={index}>
        <p>
          <strong>Question:</strong> {card.question}
        </p>

        <p>
          <strong>Answer:</strong> {card.answer}
        </p>

        <hr />
      </div>
    ))}
  </div>
)}
            <button onClick={() => generateFlashcards(material._id)}>
              Generate AI Flashcards
            </button>

            <button onClick={() => generateQuiz(material._id)}>
               Generate AI Quiz
            </button>

            <button onClick={() => generateStudyPlan(material._id)}>
               Generate AI Study Plan
            </button>

            </div>

            {studyPlans[material._id] && (
              <div className="ai-result">
                <h4>AI Study Plan</h4>
                <p>{studyPlans[material._id].plan}</p>
              </div>
)}

            {quizzes[material._id] && (
  <div className="ai-result">
    <h4>AI Quiz</h4>

    {quizzes[material._id].map((quiz, index) => (
      <div key={index}>
        <p>
          <strong>Question:</strong> {quiz.question}
        </p>

        <p>
          <strong>Options:</strong>
        </p>

        <ul>
          {quiz.options.map((option, optionIndex) => (
            <li key={optionIndex}>{option}</li>
          ))}
        </ul>

        <p>
          <strong>Answer:</strong> {quiz.answer}
        </p>

        <hr />
      </div>
    ))}
  </div>
)}

            <p>{material.content}</p>

            {summaries[material._id] && (
              <div className="ai-result">\

                <h4>AI Summary</h4>
                <p>{summaries[material._id]}</p>
              </div>
            )}

            <hr />
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default Dashboard;