// Generic CRUD controller factory for CMS models
export const createCrudController = (Model) => {
  const publicStatus = Model.modelName === "Blog" ? "published" : "active";

  return {
    // GET all (public - only active/published)
    async getAllPublic(req, res) {
      try {
        const filter = { status: publicStatus };
        if (Model.modelName === "Blog" && req.query.category) {
          filter.category = req.query.category;
        }
        const items = await Model.find(filter).sort({ createdAt: -1 });
        res.json({ items });
      } catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
      }
    },

    // GET all (admin - all statuses)
    async getAllAdmin(req, res) {
      try {
        const items = await Model.find().sort({ createdAt: -1 });
        res.json({ items });
      } catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
      }
    },

    // GET one by slug (public)
    async getBySlug(req, res) {
      try {
        const item = await Model.findOne({ slug: req.params.slug, status: publicStatus });
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json({ item });
      } catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
      }
    },

    // GET one by id (admin)
    async getById(req, res) {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json({ item });
      } catch (error) {
        res.status(500).json({ message: error.message || "Server error" });
      }
    },

    // POST create (admin)
    async create(req, res) {
      try {
        const item = await Model.create(req.body);
        res.status(201).json({ message: "Created successfully", item });
      } catch (error) {
        res.status(400).json({ message: error.message || "Failed to create" });
      }
    },

    // PUT update (admin)
    async update(req, res) {
      try {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Updated successfully", item });
      } catch (error) {
        res.status(400).json({ message: error.message || "Failed to update" });
      }
    },

    // DELETE (admin)
    async remove(req, res) {
      try {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message || "Failed to delete" });
      }
    },
  };
};
