import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useAlert } from "@/context/alert-context";

export function useProfilePage() {
  const { user, updateProfile, loading, initializing } = useAuth();
  const { showAlert } = useAlert();
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => {
        // Only update if values are different to avoid unnecessary renders/loops
        if (
          prev.name === (user.name || "") &&
          prev.email === (user.email || "") &&
          prev.avatar === (user.avatar || "")
        ) {
          return prev;
        }
        return {
          ...prev,
          name: user.name || "",
          email: user.email || "",
          avatar: user.avatar || "",
        };
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/upload-avatar`,
        {
          method: "POST",
          body: uploadData,
        },
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, avatar: data.url }));
    } catch (error) {
      console.error(error);
      // Ideally show an error toast here
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      showAlert("New passwords do not match", "destructive");
      return;
    }

    if (formData.password && !formData.oldPassword) {
      showAlert(
        "Old password is required to set a new password",
        "destructive",
      );
      return;
    }

    await updateProfile({
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
      old_password: formData.oldPassword || undefined,
      password: formData.password || undefined,
    });
    setFormData((prev) => ({
      ...prev,
      oldPassword: "",
      password: "",
      confirmPassword: "",
    })); // Clear passwords after save
  };

  return {
    user,
    loading,
    initializing,
    uploading,
    showPassword,
    formData,
    togglePasswordVisibility,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
}
