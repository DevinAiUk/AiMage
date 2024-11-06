import React, { useState } from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getFunnel, addStep } from 'wasp/client/operations';
import { useParams } from 'wasp/client/router';

const FunnelPage = () => {
  const { funnelId } = useParams();
  const { data: funnel, isLoading, error } = useQuery(getFunnel, { id: funnelId });
  const addStepFn = useAction(addStep);
  const [newStepContent, setNewStepContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleAddStep = () => {
    addStepFn({ funnelId: parseInt(funnelId), content: newStepContent });
    setNewStepContent('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{funnel.title}</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="New Step Content"
          className="px-3 py-2 border rounded-lg"
          value={newStepContent}
          onChange={(e) => setNewStepContent(e.target.value)}
        />
        <button
          onClick={handleAddStep}
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Step
        </button>
      </div>
      <div>
        {funnel.steps.map((step) => (
          <div key={step.id} className="py-2 px-4 mb-2 bg-slate-100 rounded-lg">
            {step.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunnelPage;
