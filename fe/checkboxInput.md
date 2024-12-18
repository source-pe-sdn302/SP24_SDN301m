const [formData, setFormData] = useState({
name: "",
description: "",
startDate: "",
type: "",
departments: [], // Lưu danh sách các department được chọn
});

const handleDepartmentChange = (e) => {
const { value, checked } = e.target;
const updatedDepartments = checked
? [...formData.departments, value] // Thêm department nếu được chọn
: formData.departments.filter((dep) => dep !== value); // Loại bỏ nếu bỏ chọn
setFormData({ ...formData, departments: updatedDepartments });
};

<!-- <Form.Group className="mb-3" controlId="formDepartments">
  <Form.Label>Departments *</Form.Label>
  {department.map((dep) => (
    <div key={dep._id} className="mb-2">
      <Form.Check
        type="checkbox"
        name="departments"
        id={dep._id}
        label={dep.name}
        value={dep._id}
        checked={formData.departments.includes(dep._id)} // Kiểm tra nếu đã chọn
        onChange={handleDepartmentChange}
        isInvalid={!!errors.departments}
      />
    </div>
  ))}
  {errors.departments && (
    <Form.Text className="text-danger">{errors.departments}</Form.Text>
  )}
</Form.Group> -->

const validateForm = () => {
const newErrors = {};
if (!formData.name) newErrors.name = "Project name is required";
if (!formData.description) newErrors.description = "Description is required";
if (!formData.startDate) newErrors.startDate = "Start date is required";
if (!formData.type) newErrors.type = "Type is required";
if (formData.departments.length === 0)
newErrors.departments = "At least one department must be selected";
return newErrors;
};
