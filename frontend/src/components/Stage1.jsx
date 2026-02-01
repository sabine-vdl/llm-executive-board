import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Stage1.css';

export default function Stage1({ responses, modelRoles = {} }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!responses || responses.length === 0) {
    return null;
  }

  const getModelDisplayName = (model) => {
    const role = modelRoles[model];
    if (role) {
      return role.short_title;
    }
    return model.split('/')[1] || model;
  };

  const getModelRole = (model) => {
    return modelRoles[model] || null;
  };

  const currentModel = responses[activeTab].model;
  const currentRole = getModelRole(currentModel);

  return (
    <div className="stage stage1">
      <h3 className="stage-title">Stage 1: Executive Board Responses</h3>

      <div className="tabs">
        {responses.map((resp, index) => {
          const role = getModelRole(resp.model);
          return (
            <button
              key={index}
              className={`tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
              style={role ? { '--tab-color': role.color } : {}}
            >
              {getModelDisplayName(resp.model)}
            </button>
          );
        })}
      </div>

      <div className="tab-content">
        {currentRole && (
          <div className="role-header" style={{ borderLeftColor: currentRole.color }}>
            <div className="role-title">{currentRole.title}</div>
            <div className="role-description">{currentRole.description}</div>
          </div>
        )}
        <div className="model-name">{currentModel}</div>
        <div className="response-text markdown-content">
          <ReactMarkdown>{responses[activeTab].response}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
