import React, { FC, useRef, useState, useEffect } from "react";
import { submitComment } from "../services";

interface typeCommentForm {
  slug: string;
}
/**
 *
 * @param slug:string
 * !This does not add a comment at the moment
 * @returns CommentsForm Components
 */
const CommentsForm: FC<typeCommentForm> = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDateEl = useRef();

  console.log(commentEl);
  console.log(nameEl);
  console.log(emailEl);
  console.log(storeDateEl);

  useEffect(() => {
    nameEl.current.value = window.localStorage.setItem(
      "name",
      nameEl.current.value
    );
    emailEl.current.value = window.localStorage.setItem(
      "email",
      emailEl.current.value
    );
  }, []);

  const submitionHandler = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: email } = emailEl.current;
    const { value: name } = nameEl.current;
    const { checked: storeData } = nameEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }
    const commentObj = { name, email, comment, slug };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4 ">Comments</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          name="comment"
          id=""
          // cols="30"
          // rows="10"
          ref={commentEl}
          placeholder="Please enter a comment here"
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 resize-none"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          placeholder="Name"
          name="name"
          required
          className="py-2  px-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        <input
          type="email"
          ref={emailEl}
          placeholder="Email"
          name="email"
          required
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            type="checkbox"
            ref={storeDateEl}
            id="storeDate"
            name="storeDate"
            value={"true"}
            required
          />
          <label
            className="text-gray-500 cursor-pointer mt-2 px-3"
            htmlFor="storeDate"
          >
            Save my email and name
          </label>
        </div>
      </div>

      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={submitionHandler}
          className="transition duration-500 ease-in  hover:bg-blue-500  hover:text-white 
          inline-block  border-blue-600 border-2 px-4 py-2 rounded-full cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment submited for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
