import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Loader2,
  LogOut,
  User,
  FolderKanban,
  Award,
  Mail,
  Plus,
  Trash2,
  Save,
  Upload,

  ShieldAlert,
  Home } from
"lucide-react";
import { api } from "@/lib/api-client";

import { resolveImage } from "@/hooks/use-portfolio";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
    { title: "Admin Dashboard — Navaneeth B" },
    { name: "robots", content: "noindex, nofollow" }]

  }),
  component: AdminGate
});



function AdminGate() {
  const navigate = useNavigate();
  const [state, setState] = useState("loading");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      if (!api.isAuthenticated()) {
        setState("unauthenticated");
        navigate({ to: "/login" });
        return;
      }
      try {
        const user = await api.verifySession();
        if (!active) return;
        setEmail(user.email);
        setState(user.role === "admin" ? "admin" : "forbidden");
      } catch (err) {
        if (!active) return;
        api.logout();
        setState("unauthenticated");
        navigate({ to: "/login" });
      }
    })();
    return () => {
      active = false;
    };
  }, [navigate]);

  const signOut = async () => {
    api.logout();
    navigate({ to: "/login" });
  };

  if (state === "loading" || state === "unauthenticated") {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>);

  }

  if (state === "forbidden") {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4">
        <div className="glass max-w-md rounded-3xl p-8 text-center shadow-card">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-destructive/15 text-destructive">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-4 font-display text-xl font-bold">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The account <span className="font-medium text-foreground">{email}</span> is not an admin.
            Sign in with the portfolio owner account.
          </p>
          <button
            onClick={signOut}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
            
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>);

  }

  return <Dashboard email={email} onSignOut={signOut} />;
}

const TABS = [
{ id: "profile", label: "Profile", icon: User },
{ id: "projects", label: "Projects", icon: FolderKanban },
{ id: "certificates", label: "Certificates", icon: Award },
{ id: "messages", label: "Messages", icon: Mail }];




function Dashboard({ email, onSignOut }) {
  const [tab, setTab] = useState("profile");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-sm font-bold text-white shadow-glow">
              NB
            </span>
            <div>
              <h1 className="font-display text-base font-bold leading-tight">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-2 text-sm font-medium transition-colors hover:bg-card">
              
              <Home className="h-4 w-4" /> <span className="hidden sm:inline">View site</span>
            </Link>
            <button
              onClick={onSignOut}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-3 py-2 text-sm font-medium transition-colors hover:bg-card">
              
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <nav className="mb-8 flex flex-wrap gap-2">
          {TABS.map((t) =>
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
            tab === t.id ?
            "bg-gradient-brand text-white shadow-glow" :
            "border border-border/60 bg-card/60 text-muted-foreground hover:text-foreground"}`
            }>
            
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          )}
        </nav>

        {tab === "profile" && <ProfilePanel />}
        {tab === "projects" && <ProjectsPanel />}
        {tab === "certificates" && <CertificatesPanel />}
        {tab === "messages" && <MessagesPanel />}
      </div>
    </div>);

}

/* ---------- shared helpers ---------- */

async function uploadImage(folder, file) {
  const res = await api.uploadFile(file);
  return res.url;
}

function ResolvedImg({ src, className, alt }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    let active = true;
    resolveImage(src).then((u) => active && setUrl(u));
    return () => {
      active = false;
    };
  }, [src]);
  if (!url) return <div className={`${className} bg-muted/40`} />;
  return <img src={url} alt={alt ?? ""} className={className} />;
}

function ImageUploader({
  value,
  folder,
  onChange,
  className





}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    setUploading(true);
    try {
      const path = await uploadImage(folder, file);
      onChange(path);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border/60">
        {value ?
        <ResolvedImg src={value} className="h-full w-full object-cover" /> :

        <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">No image</div>
        }
      </div>
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }} />
        
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-2 text-sm font-medium transition-colors hover:bg-card disabled:opacity-70">
          
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Upload image
        </button>
      </div>
    </div>);

}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text"






}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-base" />
      
    </label>);

}

function Area({
  label,
  value,
  onChange,
  rows = 3,
  hint






}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="input-base resize-none" />
      
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>);

}

const ACCENTS = [
"from-blue-500 to-cyan-500",
"from-rose-500 to-red-500",
"from-emerald-500 to-teal-500",
"from-violet-500 to-purple-500",
"from-amber-500 to-orange-500",
"from-fuchsia-500 to-pink-500"];


function Card({ children }) {
  return <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-card">{children}</div>;
}

/* ---------- Profile ---------- */



function ProfilePanel() {
  const qc = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({});
  const [roles, setRoles] = useState("");
  const [stats, setStats] = useState([]);
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const { isLoading } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const data = await api.getProfile();
      if (data) {
        setId(data.id);
        setForm({
          name: data.name,
          first_name: data.first_name,
          title: data.title,
          tagline: data.tagline,
          about: data.about,
          location: data.location,
          email: data.email,
          phone: data.phone,
          phone_raw: data.phone_raw,
          github: data.github,
          linkedin: data.linkedin,
          address: data.address,
          initials: data.initials,
          resume_url: data.resume_url
        });
        setRoles((data.roles ?? []).join(", "));
        setStats(data.stats ?? []);
        setPhoto(data.photo_url ?? "");
      }
      return data;
    }
  });

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        name: form.name ?? "",
        first_name: form.first_name ?? "",
        title: form.title ?? "",
        tagline: form.tagline ?? "",
        about: form.about ?? "",
        location: form.location ?? "",
        email: form.email ?? "",
        phone: form.phone ?? "",
        phone_raw: form.phone_raw ?? "",
        github: form.github ?? "",
        linkedin: form.linkedin ?? "",
        address: form.address ?? "",
        initials: form.initials ?? "",
        resume_url: form.resume_url ?? "",
        roles: roles.split(",").map((r) => r.trim()).filter(Boolean),
        stats: stats,
        photo_url: photo
      };
      await api.updateProfile(payload);
      toast.success("Profile saved");
      qc.invalidateQueries({ queryKey: ["portfolio"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <PanelLoader />;

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-4 font-display text-lg font-bold">Profile photo</h2>
        <ImageUploader value={photo} folder="profile" onChange={setPhoto} />
      </Card>

      <Card>
        <h2 className="mb-4 font-display text-lg font-bold">Basic info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" value={form.name ?? ""} onChange={set("name")} />
          <Field label="First name" value={form.first_name ?? ""} onChange={set("first_name")} />
          <Field label="Title" value={form.title ?? ""} onChange={set("title")} />
          <Field label="Initials" value={form.initials ?? ""} onChange={set("initials")} />
        </div>
        <div className="mt-4 grid gap-4">
          <Area
            label="Roles (typing animation)"
            value={roles}
            onChange={setRoles}
            hint="Comma separated, e.g. Full Stack Developer, Problem Solver" />
          
          <Area label="Tagline" value={form.tagline ?? ""} onChange={set("tagline")} rows={2} />
          <Area label="About" value={form.about ?? ""} onChange={set("about")} rows={4} />
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 font-display text-lg font-bold">Contact & links</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" value={form.email ?? ""} onChange={set("email")} />
          <Field label="Phone (display)" value={form.phone ?? ""} onChange={set("phone")} />
          <Field label="Phone (digits only)" value={form.phone_raw ?? ""} onChange={set("phone_raw")} placeholder="919865013239" />
          <Field label="Location" value={form.location ?? ""} onChange={set("location")} />
          <Field label="Address" value={form.address ?? ""} onChange={set("address")} />
          <Field label="GitHub URL" value={form.github ?? ""} onChange={set("github")} />
          <Field label="LinkedIn URL" value={form.linkedin ?? ""} onChange={set("linkedin")} />
          <Field label="Resume URL" value={form.resume_url ?? ""} onChange={set("resume_url")} />
        </div>
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Stats</h2>
          <button
            onClick={() => setStats((s) => [...s, { label: "", value: 0, suffix: "" }])}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-sm font-medium hover:bg-card">
            
            <Plus className="h-4 w-4" /> Add stat
          </button>
        </div>
        <div className="space-y-3">
          {stats.map((s, i) =>
          <div key={i} className="grid grid-cols-2 gap-2 sm:grid-cols-[2fr_1fr_1fr_1fr_auto]">
              <input
              className="input-base"
              placeholder="Label"
              value={s.label}
              onChange={(e) => setStats((arr) => arr.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
            
              <input
              className="input-base"
              placeholder="Value"
              type="number"
              value={s.value}
              onChange={(e) => setStats((arr) => arr.map((x, j) => j === i ? { ...x, value: Number(e.target.value) } : x))} />
            
              <input
              className="input-base"
              placeholder="Suffix"
              value={s.suffix}
              onChange={(e) => setStats((arr) => arr.map((x, j) => j === i ? { ...x, suffix: e.target.value } : x))} />
            
              <input
              className="input-base"
              placeholder="Decimals"
              type="number"
              value={s.decimals ?? 0}
              onChange={(e) => setStats((arr) => arr.map((x, j) => j === i ? { ...x, decimals: Number(e.target.value) } : x))} />
            
              <button
              onClick={() => setStats((arr) => arr.filter((_, j) => j !== i))}
              className="grid place-items-center rounded-lg border border-border bg-card/60 px-3 text-destructive hover:bg-card"
              aria-label="Remove stat">
              
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </Card>

      <SaveBar saving={saving} onSave={save} />
    </div>);

}

/* ---------- Projects ---------- */















const emptyProject = (order) => ({
  title: "",
  subtitle: "",
  description: "",
  image_url: "",
  tech: [],
  features: [],
  github: "",
  demo: "",
  accent: ACCENTS[0],
  sort_order: order
});

function ProjectsPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const data = await api.getProjects();
      return data;
    }
  });

  const remove = async (pid) => {
    if (!confirm("Delete this project?")) return;
    try {
      await api.deleteProject(pid);
      toast.success("Project deleted");
      refetch();
      qc.invalidateQueries({ queryKey: ["portfolio"] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  if (isLoading) return <PanelLoader />;
  if (editing) {
    return (
      <ProjectEditor
        initial={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          refetch();
          qc.invalidateQueries({ queryKey: ["portfolio"] });
        }} />);


  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setEditing(emptyProject((data?.length ?? 0) + 1))}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
          
          <Plus className="h-4 w-4" /> Add project
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {(data ?? []).map((p) =>
        <div key={p.id} className="flex gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 shadow-card">
            <ResolvedImg src={p.image_url} className="h-20 w-28 shrink-0 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold">{p.title}</h3>
              <p className="truncate text-xs text-muted-foreground">{p.subtitle}</p>
              <div className="mt-3 flex gap-2">
                <button
                onClick={() => setEditing(p)}
                className="rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs font-medium hover:bg-card">
                
                  Edit
                </button>
                <button
                onClick={() => p.id && remove(p.id)}
                className="rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-card">
                
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {(data ?? []).length === 0 && <p className="text-sm text-muted-foreground">No projects yet.</p>}
      </div>
    </div>);

}

function ProjectEditor({
  initial,
  onClose,
  onSaved




}) {
  const [p, setP] = useState(initial);
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setP((prev) => ({ ...prev, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        image_url: p.image_url,
        tech: p.tech,
        features: p.features,
        github: p.github || null,
        demo: p.demo || null,
        accent: p.accent,
        sort_order: p.sort_order
      };
      if (p.id) {
        await api.updateProject(p.id, payload);
      } else {
        await api.createProject(payload);
      }
      toast.success("Project saved");
      onSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-4 font-display text-lg font-bold">{p.id ? "Edit project" : "New project"}</h2>
        <ImageUploader value={p.image_url} folder="projects" onChange={(v) => set("image_url", v)} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Title" value={p.title} onChange={(v) => set("title", v)} />
          <Field label="Subtitle" value={p.subtitle} onChange={(v) => set("subtitle", v)} />
        </div>
        <div className="mt-4">
          <Area label="Description" value={p.description} onChange={(v) => set("description", v)} rows={4} />
        </div>
        <div className="mt-4 grid gap-4">
          <Area
            label="Technologies"
            value={p.tech.join(", ")}
            onChange={(v) => set("tech", v.split(",").map((t) => t.trim()).filter(Boolean))}
            rows={2}
            hint="Comma separated" />
          
          <Area
            label="Features"
            value={p.features.join(", ")}
            onChange={(v) => set("features", v.split(",").map((t) => t.trim()).filter(Boolean))}
            rows={2}
            hint="Comma separated" />
          
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="GitHub URL" value={p.github ?? ""} onChange={(v) => set("github", v)} />
          <Field label="Live demo URL" value={p.demo ?? ""} onChange={(v) => set("demo", v)} />
          <Field
            label="Sort order"
            type="number"
            value={String(p.sort_order)}
            onChange={(v) => set("sort_order", Number(v))} />
          
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Accent gradient</span>
            <select
              value={p.accent}
              onChange={(e) => set("accent", e.target.value)}
              className="input-base">
              
              {ACCENTS.map((a) =>
              <option key={a} value={a}>
                  {a}
                </option>
              )}
            </select>
          </label>
        </div>
      </Card>
      <EditorBar saving={saving} onSave={save} onClose={onClose} />
    </div>);

}

/* ---------- Certificates ---------- */











const emptyCert = (order) => ({
  title: "",
  org: "",
  date_text: "",
  category: "Achievement",
  image_url: "",
  sort_order: order
});

function CertificatesPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-certificates"],
    queryFn: async () => {
      const data = await api.getCertificates();
      return data;
    }
  });

  const remove = async (cid) => {
    if (!confirm("Delete this certificate?")) return;
    try {
      await api.deleteCertificate(cid);
      toast.success("Certificate deleted");
      refetch();
      qc.invalidateQueries({ queryKey: ["portfolio"] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  if (isLoading) return <PanelLoader />;
  if (editing) {
    return (
      <CertEditor
        initial={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          refetch();
          qc.invalidateQueries({ queryKey: ["portfolio"] });
        }} />);


  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setEditing(emptyCert((data?.length ?? 0) + 1))}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
          
          <Plus className="h-4 w-4" /> Add certificate
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((c) =>
        <div key={c.id} className="overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-card">
            <ResolvedImg src={c.image_url} className="aspect-[4/3] w-full object-cover" />
            <div className="p-4">
              <h3 className="truncate font-semibold">{c.title}</h3>
              <p className="truncate text-xs text-muted-foreground">{c.org} · {c.date_text}</p>
              <div className="mt-3 flex gap-2">
                <button
                onClick={() => setEditing(c)}
                className="rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs font-medium hover:bg-card">
                
                  Edit
                </button>
                <button
                onClick={() => c.id && remove(c.id)}
                className="rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-card">
                
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {(data ?? []).length === 0 && <p className="text-sm text-muted-foreground">No certificates yet.</p>}
      </div>
    </div>);

}

function CertEditor({
  initial,
  onClose,
  onSaved




}) {
  const [c, setC] = useState(initial);
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setC((prev) => ({ ...prev, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        title: c.title,
        org: c.org,
        date_text: c.date_text,
        category: c.category,
        image_url: c.image_url,
        sort_order: c.sort_order
      };
      if (c.id) {
        await api.updateCertificate(c.id, payload);
      } else {
        await api.createCertificate(payload);
      }
      toast.success("Certificate saved");
      onSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="mb-4 font-display text-lg font-bold">{c.id ? "Edit certificate" : "New certificate"}</h2>
        <ImageUploader value={c.image_url} folder="certificates" onChange={(v) => set("image_url", v)} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Title" value={c.title} onChange={(v) => set("title", v)} />
          <Field label="Organization" value={c.org} onChange={(v) => set("org", v)} />
          <Field label="Date" value={c.date_text} onChange={(v) => set("date_text", v)} placeholder="17 June 2026" />
          <Field label="Category" value={c.category} onChange={(v) => set("category", v)} />
          <Field
            label="Sort order"
            type="number"
            value={String(c.sort_order)}
            onChange={(v) => set("sort_order", Number(v))} />
          
        </div>
      </Card>
      <EditorBar saving={saving} onSave={save} onClose={onClose} />
    </div>);

}

/* ---------- Messages ---------- */









function MessagesPanel() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const data = await api.getMessages();
      return data;
    }
  });

  const remove = async (mid) => {
    if (!confirm("Delete this message?")) return;
    try {
      await api.deleteMessage(mid);
      toast.success("Message deleted");
      refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  if (isLoading) return <PanelLoader />;

  return (
    <div className="space-y-4">
      {(data ?? []).map((m) =>
      <div key={m.id} className="rounded-2xl border border-border/60 bg-card/60 p-5 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">{m.name}</h3>
              <a href={`mailto:${m.email}`} className="text-sm text-secondary hover:underline">
                {m.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {new Date(m.created_at).toLocaleString()}
              </span>
              <button
              onClick={() => remove(m.id)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card/60 text-destructive hover:bg-card"
              aria-label="Delete message">
              
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{m.message}</p>
        </div>
      )}
      {(data ?? []).length === 0 && <p className="text-sm text-muted-foreground">No messages yet.</p>}
    </div>);

}

/* ---------- small UI ---------- */

function PanelLoader() {
  return (
    <div className="grid place-items-center py-20">
      <Loader2 className="h-7 w-7 animate-spin text-secondary" />
    </div>);

}

function SaveBar({ saving, onSave }) {
  return (
    <div className="sticky bottom-4 flex justify-end">
      <button
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-70">
        
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save changes
      </button>
    </div>);

}

function EditorBar({ saving, onSave, onClose }) {
  return (
    <div className="sticky bottom-4 flex justify-end gap-3">
      <button
        onClick={onClose}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-semibold hover:bg-card">
        
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-70">
        
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
      </button>
    </div>);

}