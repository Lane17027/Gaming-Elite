import React from 'react'
import baseUrl from "../api/api";

export default function Footer () {
    return (
    <footer>
      <div className="project-github">
        <h4>Project Github:</h4>
        <h4><a href="https://github.com/connorreidy1/Gaming-Elite">Github</a></h4>
      </div>
      <hr className="divider" />
      <div className="team-container">
        <div>
          <h3>Team Members</h3>
        </div>
        <div className="team-members-container">
          <div className="team-member">
            <h4>Scott Larson</h4>
            <h4><a href="https://github.com/larsonscott89">Github</a></h4>
          </div>
          <div className="team-member">
            <h4>Lane Nichols</h4>
            <h4><a href="https://github.com/Lane17027">Github</a></h4>
          </div>
          <div className="team-member">
            <h4>Kevin Wang</h4>
            <h4><a href="https://github.com/kevinwang2882">Github</a></h4>
          </div>
          <div className="team-member">
            <h4>Connor Reidy</h4>
            <h4><a href="https://github.com/connorreidy1">Github</a></h4>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="copyright">
        <p>&copy; Gaming Elite</p>
      </div>

    </footer>


     )
    }
