import ReactMarkdown from 'react-markdown';
import './Stage3.css';

export default function Stage3({ finalResponse, modelRoles = {} }) {
  if (!finalResponse) {
    return null;
  }

  const role = modelRoles[finalResponse.model];
  const displayName = role ? role.title : (finalResponse.model.split('/')[1] || finalResponse.model);

  return (
    <div className="stage stage3">
      <h3 className="stage-title">Stage 3: Chairman's Synthesis</h3>
      <div className="final-response">
        <div className="chairman-header" style={role ? { borderLeftColor: role.color } : {}}>
          <div className="chairman-label">
            Chairman: {displayName}
          </div>
          {role && (
            <div className="chairman-description">
              {role.description}
            </div>
          )}
        </div>
        <div className="final-text markdown-content">
          <ReactMarkdown>{finalResponse.response}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
