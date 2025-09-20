"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/components/ui/cn";
import { X, Upload, Loader2, ChevronLeft, ChevronRight, Package, Palette, Ruler, Camera } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Step = 1 | 2 | 3 | 4;

interface ClothingFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  subcategory: string;
  stock_quantity: string;
  colors: string[]; // Multiple colors
  pattern: string;
  materials: string[]; // Multiple materials
  size_range: string[];
  images: File[];
  size_chart: File | null; // Size chart upload
}

interface ClothingProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

// Clothing-specific categories
const clothingCategories = [
  { value: "", label: "Select Category" },
  { value: "tops", label: "Tops" },
  { value: "dresses", label: "Dresses" },
  { value: "bottoms", label: "Bottoms" },
  { value: "outerwear", label: "Outerwear" },
  { value: "ethnic", label: "Ethnic Wear" },
];

const subcategories: { [key: string]: { value: string; label: string }[] } = {
  tops: [
    { value: "", label: "Select Subcategory" },
    { value: "shirts", label: "Shirts & Blouses" },
    { value: "t-shirts", label: "T-Shirts" },
    { value: "crop-tops", label: "Crop Tops" },
    { value: "tank-tops", label: "Tank Tops" },
    { value: "sweaters", label: "Sweaters" },
  ],
  dresses: [
    { value: "", label: "Select Subcategory" },
    { value: "maxi", label: "Maxi Dresses" },
    { value: "midi", label: "Midi Dresses" },
    { value: "mini", label: "Mini Dresses" },
    { value: "cocktail", label: "Cocktail Dresses" },
    { value: "casual", label: "Casual Dresses" },
  ],
  bottoms: [
    { value: "", label: "Select Subcategory" },
    { value: "jeans", label: "Jeans" },
    { value: "trousers", label: "Trousers" },
    { value: "skirts", label: "Skirts" },
    { value: "shorts", label: "Shorts" },
    { value: "leggings", label: "Leggings" },
  ],
  outerwear: [
    { value: "", label: "Select Subcategory" },
    { value: "jackets", label: "Jackets" },
    { value: "coats", label: "Coats" },
    { value: "blazers", label: "Blazers" },
    { value: "cardigans", label: "Cardigans" },
  ],
  ethnic: [
    { value: "", label: "Select Subcategory" },
    { value: "sarees", label: "Sarees" },
    { value: "kurtas", label: "Kurtas" },
    { value: "lehengas", label: "Lehengas" },
    { value: "salwar-suits", label: "Salwar Suits" },
  ],
};

// Predefined clothing attributes
const colors = [
  "Black", "White", "Red", "Blue", "Green", "Yellow", "Pink", "Purple", 
  "Orange", "Brown", "Gray", "Navy", "Beige", "Maroon", "Teal", "Coral"
];

const patterns = [
  "Solid", "Stripes", "Floral", "Polka Dots", "Geometric", "Abstract", 
  "Animal Print", "Paisley", "Checkered", "Plaid", "Tie-Dye"
];

const materials = [
  "Cotton", "Silk", "Polyester", "Linen", "Wool", "Denim", "Chiffon", 
  "Satin", "Velvet", "Knit", "Leather", "Lace", "Georgette", "Crepe"
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

// Steps configuration
const steps = [
  { id: 1, title: "Basic Info", icon: Package, description: "Product details" },
  { id: 2, title: "Style Details", icon: Palette, description: "Colors & materials" },
  { id: 3, title: "Sizing", icon: Ruler, description: "Sizes & chart" },
  { id: 4, title: "Images", icon: Camera, description: "Product photos" },
];

export default function ClothingProductForm({ onClose, onSuccess }: ClothingProductFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<ClothingFormData>({
    title: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    stock_quantity: "",
    colors: [], // Multiple colors
    pattern: "",
    materials: [], // Multiple materials
    size_range: [],
    images: [],
    size_chart: null, // Size chart
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ClothingFormData, value: string | string[] | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 5) {
      setErrors(prev => ({ ...prev, images: "Maximum 5 images allowed" }));
      return;
    }
    
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setErrors(prev => ({ ...prev, images: "Only image files under 10MB are allowed" }));
      return;
    }

    setFormData(prev => ({ ...prev, images: [...prev.images, ...validFiles] }));
    setErrors(prev => ({ ...prev, images: "" }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = formData.size_range.includes(size)
      ? formData.size_range.filter(s => s !== size)
      : [...formData.size_range, size];
    handleInputChange("size_range", newSizes);
  };

  const handleColorToggle = (color: string) => {
    const newColors = formData.colors.includes(color)
      ? formData.colors.filter(c => c !== color)
      : [...formData.colors, color];
    handleInputChange("colors", newColors);
  };

  const handleMaterialToggle = (material: string) => {
    const newMaterials = formData.materials.includes(material)
      ? formData.materials.filter(m => m !== material)
      : [...formData.materials, material];
    handleInputChange("materials", newMaterials);
  };

  const handleSizeChartUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        setErrors(prev => ({ ...prev, size_chart: "Only image files are allowed for size chart" }));
        return;
      }
      
      if (!isValidSize) {
        setErrors(prev => ({ ...prev, size_chart: "Size chart image must be under 5MB" }));
        return;
      }
      
      setFormData(prev => ({ ...prev, size_chart: file }));
      setErrors(prev => ({ ...prev, size_chart: "" }));
    }
  };

  const validateStep = (step: Step): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Basic Info
        if (!formData.title.trim()) newErrors.title = "Product title is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.price.trim()) newErrors.price = "Price is required";
        else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
          newErrors.price = "Please enter a valid price";
        }
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.stock_quantity.trim()) newErrors.stock_quantity = "Stock quantity is required";
        else if (isNaN(Number(formData.stock_quantity)) || Number(formData.stock_quantity) < 0) {
          newErrors.stock_quantity = "Please enter a valid stock quantity";
        }
        break;

      case 2: // Style Details
        if (formData.colors.length === 0) newErrors.colors = "At least one color is required";
        if (!formData.pattern) newErrors.pattern = "Pattern is required";
        if (formData.materials.length === 0) newErrors.materials = "At least one material is required";
        break;

      case 3: // Sizing
        if (formData.size_range.length === 0) newErrors.size_range = "At least one size is required";
        break;

      case 4: // Images
        if (formData.images.length === 0) newErrors.images = "At least one image is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = (): boolean => {
    // Validate all steps without setting errors during final validation
    const newErrors: Record<string, string> = {};

    // Step 1: Basic Info
    if (!formData.title.trim()) newErrors.title = "Product title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.stock_quantity.trim()) newErrors.stock_quantity = "Stock quantity is required";
    else if (isNaN(Number(formData.stock_quantity)) || Number(formData.stock_quantity) < 0) {
      newErrors.stock_quantity = "Please enter a valid stock quantity";
    }

    // Step 2: Style Details
    if (formData.colors.length === 0) newErrors.colors = "At least one color is required";
    if (!formData.pattern) newErrors.pattern = "Pattern is required";
    if (formData.materials.length === 0) newErrors.materials = "At least one material is required";

    // Step 3: Sizing
    if (formData.size_range.length === 0) newErrors.size_range = "At least one size is required";

    // Step 4: Images
    if (formData.images.length === 0) newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1) as Step);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as Step);
  };

  const canProceed = () => {
    // Don't call validateStep during render to avoid infinite loops
    // Just check if current step has required fields filled
    switch (currentStep) {
      case 1:
        return formData.title.trim() && formData.description.trim() && formData.price.trim() && formData.category && formData.stock_quantity.trim();
      case 2:
        return formData.colors.length > 0 && formData.pattern && formData.materials.length > 0;
      case 3:
        return formData.size_range.length > 0;
      case 4:
        return formData.images.length > 0;
      default:
        return false;
    }
  };

  const canSubmit = () => {
    // Simple check for final submission without calling validateForm during render
    return formData.title.trim() && 
           formData.description.trim() && 
           formData.price.trim() && 
           formData.category && 
           formData.stock_quantity.trim() &&
           formData.colors.length > 0 && 
           formData.pattern && 
           formData.materials.length > 0 &&
           formData.size_range.length > 0 &&
           formData.images.length > 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const { data: sessionRes } = await supabase.auth.getSession();
      const token = sessionRes.session?.access_token;
      
      if (!token) {
        throw new Error("Authentication required");
      }

      const submitData = new FormData();
      
      // Add text fields
      submitData.append('title', formData.title.trim());
      submitData.append('description', formData.description.trim());
      submitData.append('price', formData.price);
      submitData.append('category', formData.category);
      submitData.append('subcategory', formData.subcategory);
      submitData.append('stock_quantity', formData.stock_quantity);
      
      // Add clothing attributes as JSON
      const attributes = {
        colors: formData.colors, // Multiple colors
        pattern: formData.pattern,
        materials: formData.materials, // Multiple materials
        size_range: formData.size_range,
      };
      submitData.append('attributes', JSON.stringify(attributes));
      
      // Add images
      formData.images.forEach((file, index) => {
        submitData.append(`image_${index}`, file);
      });
      
      // Add size chart if provided
      if (formData.size_chart) {
        submitData.append('size_chart', formData.size_chart);
      }

      const response = await fetch("/api/brand/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create product");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Product creation error:", error);
      setErrors({ submit: error instanceof Error ? error.message : "Failed to create product" });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Floral Summer Dress"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={cn(errors.title && "border-red-500")}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                placeholder="Describe the style, fit, and occasion for this clothing item"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={cn(
                  "flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                  errors.description && "border-red-500"
                )}
                rows={3}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="2999"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className={cn(errors.price && "border-red-500")}
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => {
                    handleInputChange("category", e.target.value);
                    handleInputChange("subcategory", ""); // Reset subcategory
                  }}
                  className={cn(
                    "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary",
                    errors.category && "border-red-500"
                  )}
                >
                  {clothingCategories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <select
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange("subcategory", e.target.value)}
                  disabled={!formData.category || !subcategories[formData.category]}
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:opacity-50"
                >
                  {formData.category && subcategories[formData.category] ? 
                    subcategories[formData.category].map(sub => (
                      <option key={sub.value} value={sub.value}>{sub.label}</option>
                    )) : 
                    <option value="">Select category first</option>
                  }
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock_quantity">Stock Quantity *</Label>
              <Input
                id="stock_quantity"
                type="number"
                placeholder="50"
                value={formData.stock_quantity}
                onChange={(e) => handleInputChange("stock_quantity", e.target.value)}
                className={cn(errors.stock_quantity && "border-red-500")}
              />
              {errors.stock_quantity && <p className="text-red-500 text-sm">{errors.stock_quantity}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Multiple Colors */}
            <div className="space-y-2">
              <Label>Colors * (Select all that apply)</Label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorToggle(color.toLowerCase())}
                    className={cn(
                      "px-3 py-2 rounded-lg border text-sm font-medium transition-colors text-left",
                      formData.colors.includes(color.toLowerCase())
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
              {errors.colors && <p className="text-red-500 text-sm">{errors.colors}</p>}
            </div>

            {/* Pattern */}
            <div className="space-y-2">
              <Label htmlFor="pattern">Pattern *</Label>
              <select
                id="pattern"
                value={formData.pattern}
                onChange={(e) => handleInputChange("pattern", e.target.value)}
                className={cn(
                  "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary",
                  errors.pattern && "border-red-500"
                )}
              >
                <option value="">Select Pattern</option>
                {patterns.map(pattern => (
                  <option key={pattern} value={pattern.toLowerCase()}>{pattern}</option>
                ))}
              </select>
              {errors.pattern && <p className="text-red-500 text-sm">{errors.pattern}</p>}
            </div>

            {/* Multiple Materials */}
            <div className="space-y-2">
              <Label>Materials * (Select all that apply)</Label>
              <div className="max-h-48 overflow-y-auto border border-border rounded-lg p-3" style={{ scrollbarWidth: 'thin' }}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {materials.map(material => (
                    <button
                      key={material}
                      type="button"
                      onClick={() => handleMaterialToggle(material.toLowerCase())}
                      className={cn(
                        "px-3 py-2 rounded-lg border text-sm font-medium transition-colors text-left",
                        formData.materials.includes(material.toLowerCase())
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:border-primary"
                      )}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
              {errors.materials && <p className="text-red-500 text-sm">{errors.materials}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Size Selection */}
            <div className="space-y-2">
              <Label>Available Sizes *</Label>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={cn(
                      "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                      formData.size_range.includes(size)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {errors.size_range && <p className="text-red-500 text-sm">{errors.size_range}</p>}
            </div>

            {/* Size Chart Upload */}
            <div className="space-y-2">
              <Label>Size Chart (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload size chart image (Max 5MB)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSizeChartUpload}
                  className="hidden"
                  id="size-chart-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('size-chart-upload')?.click()}
                >
                  Choose Size Chart
                </Button>
              </div>
              {formData.size_chart && (
                <div className="mt-4">
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(formData.size_chart)}
                      alt="Size Chart"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, size_chart: null }))}
                      className="absolute top-1 right-1 h-6 w-6 p-0 bg-black/50 hover:bg-black/70"
                    >
                      <X className="w-3 h-3 text-white" />
                    </Button>
                  </div>
                </div>
              )}
              {errors.size_chart && <p className="text-red-500 text-sm">{errors.size_chart}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Product Images * (Max 5 images)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload high-quality clothing images (Max 5 images, 10MB each)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  Choose Images
                </Button>
              </div>

              {/* Image previews */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {formData.images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 h-6 w-6 p-0 bg-black/50 hover:bg-black/70"
                      >
                        <X className="w-3 h-3 text-white" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header with steps */}
        <div className="sticky top-0 bg-card border-b border-border p-6 rounded-t-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-semibold">Add Clothing Product</h2>
            <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Step indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors",
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-px mx-4 transition-colors",
                        currentStep > step.id ? "bg-green-500" : "bg-border"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-220px)]" style={{ scrollbarWidth: 'thin' }}>
          {renderStepContent()}
        </div>

        {/* Footer with navigation */}
        <div className="sticky bottom-0 bg-card border-t border-border p-6 rounded-b-3xl">
          {errors.submit && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 1 ? onClose : handlePrevious}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {currentStep === 1 ? (
                <>
                  <X className="w-4 h-4" />
                  Cancel
                </>
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </>
              )}
            </Button>
            
            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !canSubmit()}
                className="flex-1 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Product"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
