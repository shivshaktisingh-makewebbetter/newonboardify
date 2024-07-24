import React, { useState } from "react";

import {
  extractUsernameFromMessage,
  getDateAndTime,
  getFirstLettersOfName,
  showUserName,
} from "../../utils/helper";
import Replies from "./Replies";
import {
  Clock,
  Govern,
  GovernifyTeam,
  Reply,
  ThumpsUp,
} from "../../utils/icons";
import { Flex } from "antd";
import UserTextEditor from "./UserTextEditor";

const UpdateAndReply = ({
  item,
  reply,
  handleChangeReplyValue,
  replyValue,
  handleFileChange,
  handleChangeEmoji,
  isUpdated,
  likeIds,
  unlikeComment,
  props,
}) => {
  const [showReplyEditor, setShowReplyEditor] = useState(false);

  let userName = showUserName(item.body);
  const cancelReply = () => {
    setShowReplyEditor(false);
  };
  const handleChangeTextEditor = (content) => {
    handleChangeReplyValue(content);
  };

  const replies = () => {
    reply("reply", item.id, replyValue);
  };

  const handleLike = () => {
    reply("like", item.id, "");
  };

  return (
    <div className={`border pt-2 mt-5 rounded position-relative`}>
      <div className="d-flex px-4 align-items-center" style={{ gap: "5px" , marginTop:"0.9rem" }}>
        <div className="d-flex align-items-center">
          <span
            className="rounded-circle fw-bold text-white d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px", background: userName !== "Onboardify Team"?"#497ed8":'' , paddingTop:userName !== "Onboardify Team"?"4px":"0px" , fontSize:"18px" }}
          >
            {userName === "Onboardify Team" ? (
             <img src="/loader.png" alt="No Preview" width={30} height={30}/> 
            ) : (
              getFirstLettersOfName(userName)
            )}
          </span>
        </div>
        <div
          className="d-flex w-100 inc-comment-header"
          style={{ justifyContent: "space-between" }}
        >
          <span
            style={{
              fontSize: "18px",
              color: "#454545",
              fontWeight: "500",
            }}
          >
            {showUserName(item.body)}
          </span>

          <span style={{ color: "#6F7490" }}>
            <Clock /> {getDateAndTime(item.created_at)}
          </span>
        </div>
      </div>
      <div className="mt-4 px-4" style={{ marginBottom: "70px" }}>
        <p
          style={{ color: "#6F7490" }}
          dangerouslySetInnerHTML={{
            __html: extractUsernameFromMessage(item.body),
          }}
        />
      </div>
      <div className="border w-100" style={{ bottom: "0", left: "0" }}>
        <button
          className="w-50 bg-white p-2"
          style={{
            border: "none",
            borderRight: "1px solid #cbc2c2",
            color: "#6F7490",
          }}
          onClick={likeIds ? () => unlikeComment(item.id) : handleLike}
        >
          <span
            className="d-flex justify-content-center align-items-center"
            style={{ gap: "5px" }}
          >
            {likeIds ? (
              <span>👍</span>
            ) : (
              <>
                <span>
                  <ThumpsUp />
                </span>
                <span>Like</span>
              </>
            )}
          </span>
        </button>
        <button
          className="w-50 bg-white p-2"
          style={{ border: "none", color: "#6F7490" }}
          onClick={() => setShowReplyEditor(true)}
        >
          <span
            className="d-flex justify-content-center align-items-center"
            style={{ gap: "5px" }}
          >
            <span>
              <Reply />{" "}
            </span>
            <span>Reply</span>
          </span>
        </button>
      </div>
      {item.replies.length > 0 &&
        item.replies.map((reply) => {
          return (
            <div className="px-4 pt-3">
              <Replies item={reply} />
            </div>
          );
        })}
      {item.replies.length > 0 && !showReplyEditor && (
        <Flex className="p-4" gap={10}>
          <div className="d-flex align-items-center">
            <span
              className="rounded-circle fw-bold text-white d-flex align-items-center justify-content-center"
              style={{ width: "35px", height: "35px", background: "#5AC063" , paddingTop:"4px" }}
            >
              {getFirstLettersOfName(sessionStorage.getItem("userName"))}
            </span>
          </div>
          <span className="d-block w-100">
            <input
              type="text"
              placeholder="Write a reply..."
              className="w-100 border border-info-subtle incorpify-update-input"
              style={{
                borderRadius: "50px",
                padding: "5px 10px",
              }}
              onFocus={(e) => setShowReplyEditor(true)}
            />
          </span>
        </Flex>
      )}
      {showReplyEditor && (
        <Flex gap={10} className="p-4">
          <div
            className="rounded-circle fw-bold text-white d-flex align-items-center justify-content-center"
            style={{
              background: "#5AC063",
              width: "38px",
              height: "35px",
              fontSize: "15px",
              lineHeight: 1,
              display: "inline-block",
            }}
          >
            <span style={{ lineHeight: 1, display: "inline-block" }}>
              {getFirstLettersOfName(sessionStorage.getItem("userName"))}
            </span>
          </div>
          <div className="w-100">
            <UserTextEditor
              cancelUpdate={cancelReply}
              handleChangeTextEditor={handleChangeTextEditor}
              updateValue={replyValue}
              update={replies}
              handleFileChange={handleFileChange}
              handleChangeEmoji={handleChangeEmoji}
              isUpdated={false}
              props={props}
              type='reply'
            />
          </div>
        </Flex>
      )}
    </div>
  );
};

export default UpdateAndReply;
