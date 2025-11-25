import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Material {
  name: string;
  quantity: string;
  unit: string;
}

const CreateRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    description: '',
    materials: [{ name: '', quantity: '', unit: '' }] as Material[]
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMaterialChange = (index: number, field: keyof Material, value: string) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials[index][field] = value;
    setFormData({
      ...formData,
      materials: updatedMaterials
    });
  };

  const addMaterial = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, { name: '', quantity: '', unit: '' }]
    });
  };

  const removeMaterial = (index: number) => {
    const updatedMaterials = formData.materials.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      materials: updatedMaterials
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const filteredMaterials = formData.materials
        .filter(material => material.name.trim() && material.quantity)
        .map(material => ({
          ...material,
          quantity: parseInt(material.quantity)
        }));

      await axios.post('/api/requests', {
        ...formData,
        materials: filteredMaterials
      });
      
      navigate('/requests');
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Error creating request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <h1>Create New Request</h1>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label>Materials:</label>
            {formData.materials.map((material, index) => (
              <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'end' }}>
                <div style={{ flex: 2 }}>
                  <label>Name:</label>
                  <input
                    type="text"
                    value={material.name}
                    onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
                    className="form-control"
                    placeholder="e.g., Pens, Paper, etc."
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={material.quantity}
                    onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
                    className="form-control"
                    placeholder="10"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Unit:</label>
                  <input
                    type="text"
                    value={material.unit}
                    onChange={(e) => handleMaterialChange(index, 'unit', e.target.value)}
                    className="form-control"
                    placeholder="pcs, boxes, etc."
                  />
                </div>
                {formData.materials.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMaterial(index)}
                    className="btn btn-danger"
                    style={{ marginBottom: '0.5rem' }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addMaterial}
              className="btn btn-primary"
            >
              Add Another Material
            </button>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;