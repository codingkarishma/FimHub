import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Card from './ui/Card';

export default function MutationResultsChart({ mutation, results }) {
  if (!results || !mutation) {
    return (
      <Card>
        <p className="text-gray-600 text-center py-8">Select a mutation to see results</p>
      </Card>
    );
  }

  // Extract values from mutation data
  const affinity = results.Affinity || -7.2;
  const stability = results.Stability || -0.8;
  const dAffinity = results.dAffinity || 1.3;
  
  // Data for binding energy comparison (if we have WT data from backend)
  const energyData = [
    {
      name: mutation.mutation || mutation.name,
      affinity: parseFloat(affinity.toFixed(2)),
      fill: '#ef4444',
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-bold mb-6 text-primary-600">Mutation Results</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={energyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Affinity (kcal/mol)', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
              formatter={(value) => `${value.toFixed(2)} kcal/mol`}
            />
            <Bar dataKey="affinity" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-6 text-primary-600">Detailed Results</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Affinity</p>
            <div className="flex items-baseline justify-center gap-1">
              <p className="text-2xl font-bold text-primary-600">
                {affinity.toFixed(2)}
              </p>
              <p className="text-xs text-gray-600">kcal/mol</p>
            </div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">ΔAffinity</p>
            <div className="flex items-baseline justify-center gap-1">
              <p className={`text-2xl font-bold ${dAffinity > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {dAffinity.toFixed(3)}
              </p>
              <p className="text-xs text-gray-600">Δ</p>
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Stability</p>
            <div className="flex items-baseline justify-center gap-1">
              <p className="text-2xl font-bold text-accent-600">
                {stability.toFixed(3)}
              </p>
              <p className="text-xs text-gray-600">kcal/mol</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4 text-primary-600">What This Means</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>Affinity:</strong> How strongly this FimH variant binds to mannose. 
            {affinity < -6 ? ' High affinity - strong binding.' : ' Lower affinity - weaker binding.'}
          </p>
          <p>
            <strong>ΔAffinity:</strong> How much this mutation changes binding compared to wild-type. 
            {dAffinity > 0 ? ' Positive = reduced binding.' : ' Negative = enhanced binding.'}
          </p>
          <p>
            <strong>Stability:</strong> Whether the mutation affects protein structural stability.
          </p>
        </div>
      </Card>
    </div>
  );
}
