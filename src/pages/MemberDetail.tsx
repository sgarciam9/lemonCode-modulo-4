import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface MemberDetailData {
  login: string;
  avatar_url: string;
  html_url: string;
}

function MemberDetail() {
  const { login } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<MemberDetailData | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then((data) => setMember(data));
  }, [login]);

  if (!member) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={() => navigate(-1)}>⬅ Volver</button>

      <h2>{member.login}</h2>
      <img src={member.avatar_url} width={150} />
      <p>
        <a href={member.html_url} target="_blank">
          Ver perfil en GitHub
        </a>
      </p>
    </div>
  );
}

export default MemberDetail;
