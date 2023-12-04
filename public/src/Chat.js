import './App.css';
import '../src/normal.css'
import TextArea from './components/textarea';
import { useState, useEffect, React, useRef } from 'react';

const Chat = () => {
const [input, setInput] = useState("");
const [chatLog, setChatLog] = useState([]);
const [isZoroResponding, setIsZoroResponding] = useState(false);
const [typingMessage, setTypingMessage] = useState("Hey! I'm Zoro, Your Personalised Medical Chatbot. How can I help?");
const [responseMessage, setResponseMessage] = useState('');
const [symptomList, setSymptomList] = useState([]);
// const [probableSymptomList, setProbableSymptomList] = useState([]);
const [diseaseList, setDiseaseList] = useState([]);
const [reqNum, setReqNum] = useState(1);
const messagesEndRef = useRef(null)
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}
useEffect(() => {
  scrollToBottom()
}, [chatLog, input, responseMessage]);

const handleClick = () => {
  setInput("");
  setChatLog([]);
  setResponseMessage("");
  setSymptomList([]);
  setDiseaseList([]);
  setReqNum(1);
}

  async function HandleSubmit (e) {
    e.preventDefault();

    if (isZoroResponding) {
      return;
    }
    
    const msg = [...chatLog]
    console.log(msg);
    msg.push({user : "me", message: `${input}`})
    setChatLog(msg)
    setInput("");
    setIsZoroResponding(true);
    
    msg.push({user: "zoro" , message: ""})
    setChatLog(msg)
    var response = "";
    var rn = reqNum;
    rn++;

    const apiUrl = 'http://127.0.0.1:8000/api/heyzoro/';

    try {
      const responsee = await fetch(apiUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ prompt: input, symptoms: symptomList, reqnum: reqNum }),
      });
      setSymptomList([]);

      if (!responsee.ok) {
        throw new Error(`HTTP error! Status: ${responsee.status}`);
      }
  
      const data = await responsee.json();

      console.log(data);
      if(data.status === "no-change"){
        if(reqNum == 5){
          response = data.remedy;
          rn = 1;
        }
        else{
          response = data.message;
        }
      }
      else if(data.status === "in-progress"){
        setSymptomList(data.symptoms);
        setDiseaseList(data.predictions)
        // setProbableSymptomList(data.probable_symptoms)
        if(reqNum == 5){
          response = data.remedy;
          rn = 1;
        }
        else{
          response = `${data.message}. Do you experience any of the following symptoms? ${data.probable_symptoms.join(', ')}`;
        }
      }
      else{
        setSymptomList(data.symptoms);
        setDiseaseList(data.predictions);
        // setProbableSymptomList(data.probable_symptoms);
        if(reqNum == 5){
          response = data.remedy;
          rn = 1;
        }
        else{
          response = `${data.message}. Do you experience any of the following symptoms? ${data.probable_symptoms.join(', ')}`;
        }
      }
      console.log(response);
      setReqNum(rn);
      console.log(reqNum);
    } catch (error) {
      console.error('Error:', error);
    }
    // console.log(probableSymptomList);
  
    setResponseMessage(response);
    let i = 0;
    setTypingMessage('Zoro is typing...');
    const intervalId = setInterval(() => {
    if (i < response.length) {
      const last = msg.slice(-1)[0].message;
      msg.slice(-1)[0].message = last + response[i];
      setChatLog([...msg]);
      i++;
    } else {
      setIsZoroResponding(false);
      setTypingMessage("Hey! I'm Zoro, Your Personalized Medical Chatbot. How can I help?");
      clearInterval(intervalId);
    }
  }, 10); // Adjust the delay between each character
  
};

  return (
    <div className="App">
      <aside className = 'sidemenu'>
        <h1>ZORO-MEDIBOT</h1>
        <div className = 'side-menu-button' onClick={handleClick}>
          <span>&#8634;</span>
          Refresh Chat
        </div>
        <div className='container'>
            <div className="col-sm">
                Diseases
                <br/>
                <ul className='list'>
                    {diseaseList && diseaseList.map((e, index) => (
                      <li key={index}> {e} </li>
                    ))}
                </ul>
                </div>
            <div className="col-sm">
                Symptoms
                <br />
                <ul className='list'>
                    {symptomList && symptomList.map((e, index) => (
                      <li key={index}> {e} </li>
                    ))}
                </ul>
                <br />
                {/* Do you experience any of the following symptoms?
                <ul className='list'>
                    {probableSymptomList && probableSymptomList.map((e, index) => (
                      <li key={index}> {e} </li>
                    ))}
                </ul>
                <br /> */}

            </div>
        </div>
      </aside>
      <section className = 'chatbox'>
        <div>
          <div className='chat-section'>
            {chatLog.map((message, index) => (
              <ChatMessage key={index} className={`${message.user}`} message = {message}/>
            ))}
            <div ref={messagesEndRef} />
          </div>
          </div>
        <div className = 'chat-input-holder'>
          <TextArea classs = "chat-input-textarea" 
          valuee = {input}
          placeholderr = {typingMessage}
          onSubmit = {HandleSubmit} 
          handleOnChange = {(e) => setInput(e.target.value)}
          />
        </div>
      </section>
    </div>
  );
}
const ChatMessage = ({message}) => {
  const classs = "avatar " + `${message.user}`;
    return (
      <div className = "chat-message-center">
        <div className = {`${classs}`}>
          {classs == "avatar me" && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
            </svg>)
          }
          {classs == "avatar zoro" && (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-robot" viewBox="0 0 16 16">
            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
            </svg>)
          }
        </div>
        <div className = "message">
        {message.message}
        </div> 
        </div>
    );
  }
export default Chat