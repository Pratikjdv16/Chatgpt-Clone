import React, { useRef, useState } from "react";
import "./CSS/Chat.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addHistoryData,
  updateHistoryData,
  setDisplayEditPromptSection,
  addFirstHistoryData,
  setChatDataStatus,
} from "../Store/ChatSlice";
import sendMsgToOpenAI from "../OpenAI/OpenAI";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

const Chat = ({ state }) => {
  const textAreaRef = useRef(null);
  const dispatch = useDispatch();
  const param = useParams();

  //= Selectors ===============================================================

  const displayEditPromptSection = useSelector(
    (state) => state.ChatSlice.displayEditPromptSection
  );

  const chatDataStatus = useSelector((state) => state.ChatSlice.chatDataStatus);

  const historyData = useSelector((state) => state.ChatSlice.historyData);

  //= States ==================================================================

  const [count, setCount] = useState(0);

  const [promptText, setPromptText] = useState("");

  const [editPromptText, setEditPromptText] = useState("");

  //= Event handlers ==========================================================

  const handleInput = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 185) + "px";
  };

  const onSubmitPrompt = async () => {
    if (promptText !== "") {
      setCount(count + 1);
      const response = await sendMsgToOpenAI(promptText);

      const modifyData = {
        dataId: count,
        prompt: promptText,
        response: response, // String / Array
      };

      let chatDataExist = historyData.find((value) => {
        return value.historyId === param.id;
      });

      if (chatDataExist) {
        dispatch(
          addHistoryData({
            historyId: param.id,
            data: modifyData,
          })
        );
      } else {
        dispatch(
          addFirstHistoryData({
            historyId: param.id,
            data: modifyData,
          })
        );
        dispatch(setChatDataStatus(true));
      }

      textAreaRef.current.style.height = "40px";
      setPromptText("");
    } else {
      alert("Prompt is required");
    }
  };

  return (
    <section id="chat" style={{ width: state.chatWidth }}>
      {/* Chat section ---------------------------------------------------------------- */}
      {chatDataStatus === true &&
        historyData[param.id].data.map((value, index) => {
          return (
            <div
              key={index}
              className="chatBox"
              style={
                index === historyData[param.id].data.length - 1
                  ? { paddingBottom: "12rem" }
                  : { paddingBottom: "0rem" }
              }
            >
              {/* Prompt Section */}
              <div className="promptBox">
                {/* Edit Btn */}
                {displayEditPromptSection === false && (
                  <div
                    className="promptEditLogoDiv"
                    onClick={() => {
                      dispatch(setDisplayEditPromptSection(true));
                      setEditPromptText(value.prompt);
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-md"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                        fill="white"
                      ></path>
                    </svg>
                  </div>
                )}

                {/* Prompt Section */}
                {displayEditPromptSection === false && (
                  <div className="promptContentDiv">
                    <p>{value.prompt}</p>
                  </div>
                )}

                {/* Edit Prompt Section */}
                {displayEditPromptSection === true && (
                  <div className="promptEditBox">
                    <div className="promptEditBoxContentDiv">
                      {/* Text Area */}
                      <textarea
                        ref={textAreaRef}
                        value={editPromptText}
                        onInput={handleInput}
                        onChange={(event) =>
                          setEditPromptText(event.target.value)
                        }
                      ></textarea>
                    </div>

                    {/* Button Section */}
                    <div className="promptEditBoxActionDiv">
                      {/* Cancel Button */}
                      <button
                        id="cancelBtn"
                        onClick={() => {
                          dispatch(setDisplayEditPromptSection(false));
                          setEditPromptText("");
                        }}
                      >
                        Cancel
                      </button>

                      {/* Update button */}
                      <button
                        id="updateBtn"
                        onClick={() => {
                          dispatch(
                            updateHistoryData({
                              id: param.id - 1,
                              dataId: index,
                              updatePrompt: editPromptText,
                            })
                          );
                          dispatch(setDisplayEditPromptSection(false));
                          setEditPromptText("");
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Response Section */}
              <div className="aiResponseBox">
                <div className="chatgptLogoDiv">
                  <svg
                    width="41"
                    height="41"
                    viewBox="0 0 41 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon-md"
                    role="img"
                  >
                    <text x="-9999" y="-9999">
                      ChatGPT
                    </text>
                    <path
                      d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>

                <div className="responseContentDiv">
                  {value.response.map((item, index) => {
                    const v = (index + 1) % 2;

                    return v === 1 ? (
                      <div className="code-description" key={index}>
                        <ReactMarkdown>{item}</ReactMarkdown>
                      </div>
                    ) : (
                      <div className="code-content" key={index}>
                        <div className="cond-content-headingBox">
                          <span style={{ fontSize: "0.75rem" }}>
                            javascript
                          </span>
                          <span
                            className="copyCode"
                            onClick={() => {
                              let getCopyData = item;
                              navigator.clipboard
                                .writeText(getCopyData)
                                .then(() => {
                                  alert("Copied");
                                });
                            }}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon-sm"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z"
                                fill="#b4b4b4"
                              ></path>
                            </svg>
                            Copy code
                          </span>
                        </div>

                        <div className="cond-content-codeBox">
                          <SyntaxHighlighter
                            language="javascript"
                            style={solarizedlight}
                            customStyle={{
                              padding: "20px",
                              borderRadius: "10px",
                              fontSize: "1rem",
                            }}
                          >
                            {`${item}`}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

      {/* Message Chatgpt -------------------------------------------------------------- */}
      <div className="promptInputBox" style={{ right: state.promptRight }}>
        {/* Prompt Input Section */}
        <div className="promptInputContentDiv">
          <textarea
            ref={textAreaRef}
            value={promptText}
            onInput={handleInput}
            onChange={(event) => setPromptText(event.target.value)}
            placeholder="Message ChatGPT 16"
          ></textarea>
        </div>

        {/* Button Section */}
        <div className="promptActionButtonsDiv">
          <button id="attachFilesButton">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
                fill="white"
              ></path>
            </svg>
          </button>

          <button id="submitPromptButton" onClick={onSubmitPrompt}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon-2xl"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                fill="black"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Footer ----------------------------------------------------------------------- */}
      <div className="footer" style={{ width: state.mainWidth }}>
        <span>ChatGPT 16 can make mistakes. Check important info.</span>
      </div>
    </section>
  );
};

export default Chat;
