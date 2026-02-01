import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Stage2.css';

function deAnonymizeText(text, labelToModel, modelRoles) {
  if (!labelToModel) return text;

  let result = text;
  // Replace each "Response X" with the actual model name/role
  Object.entries(labelToModel).forEach(([label, model]) => {
    const role = modelRoles[model];
    const displayName = role ? role.short_title : (model.split('/')[1] || model);
    result = result.replace(new RegExp(label, 'g'), `**${displayName}**`);
  });
  return result;
}

export default function Stage2({ rankings, labelToModel, aggregateRankings, modelRoles = {} }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!rankings || rankings.length === 0) {
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

  return (
    <div className="stage stage2">
      <h3 className="stage-title">Stage 2: Board Member Reviews</h3>

      <h4>Peer Evaluations</h4>
      <p className="stage-description">
        Each board member evaluated all responses (anonymized as Response A, B, C, etc.) and provided rankings.
        Below, roles are shown in <strong>bold</strong> for readability, but the original evaluation used anonymous labels.
      </p>

      <div className="tabs">
        {rankings.map((rank, index) => {
          const role = getModelRole(rank.model);
          return (
            <button
              key={index}
              className={`tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
              style={role ? { '--tab-color': role.color } : {}}
            >
              {getModelDisplayName(rank.model)}
            </button>
          );
        })}
      </div>

      <div className="tab-content">
        <div className="ranking-model">
          {rankings[activeTab].model}
        </div>
        <div className="ranking-content markdown-content">
          <ReactMarkdown>
            {deAnonymizeText(rankings[activeTab].ranking, labelToModel, modelRoles)}
          </ReactMarkdown>
        </div>

        {rankings[activeTab].parsed_ranking &&
         rankings[activeTab].parsed_ranking.length > 0 && (
          <div className="parsed-ranking">
            <strong>Extracted Ranking:</strong>
            <ol>
              {rankings[activeTab].parsed_ranking.map((label, i) => (
                <li key={i}>
                  {labelToModel && labelToModel[label]
                    ? getModelDisplayName(labelToModel[label])
                    : label}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {aggregateRankings && aggregateRankings.length > 0 && (
        <div className="aggregate-rankings">
          <h4>Board Consensus (Performance Rankings)</h4>
          <p className="stage-description">
            Combined results across all peer evaluations (lower score is better):
          </p>
          <div className="aggregate-list">
            {aggregateRankings.map((agg, index) => {
              const role = getModelRole(agg.model);
              return (
                <div key={index} className="aggregate-item" style={role ? { borderLeftColor: role.color } : {}}>
                  <span className="rank-position">#{index + 1}</span>
                  <span className="rank-model">
                    {getModelDisplayName(agg.model)}
                  </span>
                  <span className="rank-score">
                    Avg: {agg.average_rank.toFixed(2)}
                  </span>
                  <span className="rank-count">
                    ({agg.rankings_count} votes)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
