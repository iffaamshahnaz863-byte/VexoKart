
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { ArrowLeftIcon } from '../../assets/icons';

const ProductForm: React.FC<{ product: Product | null; onSave: (p: any) => void; onCancel: () => void }> = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', originalPrice: '', category: 'Electronics', stock: '', images: [] as string[], sizes: ''
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: String(product.price),
                originalPrice: String(product.originalPrice),
                category: product.category,
                stock: String(product.stock),
                images: product.images,
                sizes: product.sizes?.join(', ') || ''
            });
        } else {
            setFormData({
                name: '', description: '', price: '', originalPrice: '', category: 'Electronics', stock: '', images: [], sizes: ''
            });
        }
    }, [product]);
    
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const base64Promises = files.map((file: File) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = error => reject(error);
                });
            });
            try {
                const base64Images = await Promise.all(base64Promises);
                setFormData(prev => ({ ...prev, images: [...prev.images, ...base64Images] }));
            } catch (error) {
                console.error("Error converting files to base64", error);
                alert("There was an error uploading the images.");
            }
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.images.length === 0) {
            alert('Please upload at least one image.');
            return;
        }
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            originalPrice: parseFloat(formData.originalPrice),
            stock: parseInt(formData.stock),
            sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
        };
        onSave(product ? { ...product, ...productData } : productData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-full overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border rounded" required />
                    <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded" required />
                    <div className="flex space-x-2">
                        <input type="number" step="0.01" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full p-2 border rounded" required />
                        <input type="number" step="0.01" placeholder="Original Price" value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: e.target.value })} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="flex space-x-2">
                        <input type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full p-2 border rounded" required />
                        <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full p-2 border rounded" required />
                    </div>
                     <input type="text" placeholder="Sizes (comma separated, e.g., S, M, L)" value={formData.sizes} onChange={e => setFormData({ ...formData, sizes: e.target.value })} className="w-full p-2 border rounded" />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"/>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {formData.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={image} alt="product preview" className="h-20 w-20 rounded-md object-cover"/>
                                    <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">&times;</button>
                                </div>
                            ))}
                        </div>
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


const AdminManageProductsPage: React.FC = () => {
    const { navigateTo, isAdminAuthenticated, products, addProduct, updateProduct, deleteProduct } = useApp();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    
    useEffect(() => {
        if (!isAdminAuthenticated) navigateTo('adminLogin');
    }, [isAdminAuthenticated, navigateTo]);

    const handleSave = (productData: any) => {
        if (editingProduct) {
            updateProduct(productData);
        } else {
            addProduct(productData);
        }
        setIsFormVisible(false);
        setEditingProduct(null);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormVisible(true);
    };

    const handleDelete = (productId: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(productId);
        }
    };

    if (!isAdminAuthenticated) return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center">
                        <button onClick={() => navigateTo('adminDashboard')} className="p-2 -ml-2 mr-2"><ArrowLeftIcon /></button>
                        <h1 className="text-xl font-bold text-gray-800">Manage Products</h1>
                    </div>
                    <button onClick={() => { setEditingProduct(null); setIsFormVisible(true); }} className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Add New</button>
                </div>
            </header>
            <main className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    {products.length > 0 ? (
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td className="p-3 whitespace-nowrap"><div className="w-48 truncate font-semibold">{product.name}</div></td>
                                        <td className="p-3 whitespace-nowrap">₹{product.price.toFixed(2)}</td>
                                        <td className="p-3 whitespace-nowrap">{product.stock}</td>
                                        <td className="p-3 whitespace-nowrap space-x-2">
                                            <button onClick={() => handleEdit(product)} className="text-blue-600 font-semibold">Edit</button>
                                            <button onClick={() => handleDelete(product.id)} className="text-red-600 font-semibold">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-600">No products found.</p>
                            <p className="text-sm text-gray-500 mt-1">Click "Add New" to get started.</p>
                        </div>
                    )}
                </div>
            </main>
            {isFormVisible && <ProductForm product={editingProduct} onSave={handleSave} onCancel={() => { setIsFormVisible(false); setEditingProduct(null); }} />}
        </div>
    );
};

export default AdminManageProductsPage;