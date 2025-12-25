
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Banner } from '../../types';
import { ArrowLeftIcon } from '../../assets/icons';

const BannerForm: React.FC<{ onSave: (b: Omit<Banner, 'id'>) => void; onCancel: () => void }> = ({ onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            alert('Please upload a banner image.');
            return;
        }
        onSave({ title, subtitle, image });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Add Banner</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
                    <input type="text" placeholder="Subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full p-2 border rounded" required />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" required />
                        {image && <img src={image} alt="preview" className="mt-2 h-24 rounded-md object-contain"/>}
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AdminManageBannersPage: React.FC = () => {
    const { navigateTo, isAdminAuthenticated, banners, addBanner, deleteBanner } = useApp();
    const [isFormVisible, setIsFormVisible] = useState(false);
    
    useEffect(() => {
        if (!isAdminAuthenticated) navigateTo('adminLogin');
    }, [isAdminAuthenticated, navigateTo]);

    const handleSave = (bannerData: Omit<Banner, 'id'>) => {
        addBanner(bannerData);
        setIsFormVisible(false);
    };

    const handleDelete = (bannerId: number) => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            deleteBanner(bannerId);
        }
    };

    if (!isAdminAuthenticated) return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                        <button onClick={() => navigateTo('adminDashboard')} className="p-2 -ml-2 mr-2"><ArrowLeftIcon /></button>
                        <h1 className="text-xl font-bold text-gray-800">Manage Banners</h1>
                    </div>
                    <button onClick={() => setIsFormVisible(true)} className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Add New</button>
                </div>
            </header>
            <main className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    {banners.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                            {banners.map(banner => (
                                <div key={banner.id} className="border rounded-lg overflow-hidden shadow">
                                    <img src={banner.image} alt={banner.title} className="w-full h-32 object-cover"/>
                                    <div className="p-3">
                                        <h3 className="font-bold truncate">{banner.title}</h3>
                                        <p className="text-sm text-gray-600 truncate">{banner.subtitle}</p>
                                        <div className="text-right mt-2">
                                            <button onClick={() => handleDelete(banner.id)} className="text-red-600 font-semibold text-sm">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-600">No banners found.</p>
                            <p className="text-sm text-gray-500 mt-1">Click "Add New" to create a banner.</p>
                        </div>
                    )}
                </div>
            </main>
            {isFormVisible && <BannerForm onSave={handleSave} onCancel={() => setIsFormVisible(false)} />}
        </div>
    );
};

export default AdminManageBannersPage;