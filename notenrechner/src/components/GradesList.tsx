'use client';

import { useEffect, useState } from 'react';
import { apiService } from '../app/services/api.service';

interface Grade {
  id: number;
  subject: string;
  grade: number;
  date: string;
  description?: string;
}

export default function GradesList() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    try {
      const data = await apiService.getGrades();
      setGrades(data);
    } catch (err) {
      setError('Fehler beim Laden der Noten');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Lade...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Meine Noten</h2>
      <div className="grid gap-4">
        {grades.map((grade) => (
          <div
            key={grade.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h3 className="font-medium">{grade.subject}</h3>
            <p className="text-lg">{grade.grade}</p>
            <p className="text-sm text-gray-500">
              {new Date(grade.date).toLocaleDateString()}
            </p>
            {grade.description && (
              <p className="text-sm text-gray-600">{grade.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 