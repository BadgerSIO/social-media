import React from "react";

const ProfileModal = ({ modalinfo }) => {
  return (
    <>
      {/* The button to open modal */}

      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="profileModal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action">
            <label htmlFor="profileModal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
