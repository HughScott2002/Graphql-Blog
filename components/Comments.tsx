import React, { FC, useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "../services";

interface typeComments {
  slug: string;
}
type Comment = {
  name: string;
  createdAt: string;
  comment: string;
};

const Comments: FC<typeComments> = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => setComments(result));
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pd-4">
            {comments.length}
            &nbsp;
            {Comments.length === 0
              ? "Comment"
              : Comments.length > 0
              ? "Comments"
              : "Invaild number"}
          </h3>
          {comments.map((comment: Comment) => {
            return (
              <div
                key={comment.createdAt}
                className="border-b border-grey-100 mb-4 pb-4"
              >
                <p className="mb-4">
                  <span className="font-semibold">{comment.name}</span> &nbsp;
                  on &nbsp;
                  {moment(comment.createdAt).format("MMM DD, YYYY")}
                </p>
                <p className="whitespace-pre-line text-gray-600 w-full">
                  {parse(comment.comment)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Comments;
