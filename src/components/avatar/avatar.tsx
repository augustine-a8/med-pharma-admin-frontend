import "./avatar.style.css";

export default function Avatar() {
  return (
    <div className="avatar">
      <div className="avatar-img-box">
        <img src="/profile-picture.jpg" alt="profile picture" />
      </div>
      <div className="avatar-text-box">
        <p>Good morning</p>
        <p>Joseph Singh</p>
      </div>
    </div>
  );
}
