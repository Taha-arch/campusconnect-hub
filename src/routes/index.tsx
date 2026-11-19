import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Building2, CalendarDays, Check, ChevronDown, Heart, MapPin, Menu, Search, Sparkles, Tag, Users, X } from "lucide-react";
import logo from "/synapse-mark.png";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Synapse | La vie du campus, en un seul endroit" },
      { name: "description", content: "Découvrez les événements du campus, trouvez ceux qui vous correspondent et rejoignez la communauté Synapse." },
      { property: "og:title", content: "Synapse | Événements du campus" },
      { property: "og:description", content: "Découvrez et retrouvez les événements de la vie universitaire avec Synapse." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

const categories = ["Tous", "Conférence", "Atelier", "Compétition", "Culture"];

function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [location, setLocation] = useState("Toutes les villes");
  const [favorites, setFavorites] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    const needle = search.trim().toLocaleLowerCase("fr");
    return events.filter((event) => {
      const matchesSearch = !needle || [event.title, event.location, event.category, event.venue].some((value) => value.toLocaleLowerCase("fr").includes(needle));
      const matchesCategory = category === "Tous" || event.category === category;
      const matchesLocation = location === "Toutes les villes" || event.city === location;
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [search, category, location]);

  function closeDialog() {
    setDialog(null);
    setSelectedEvent(null);
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="Synapse, accueil">
          <img src={logo} alt="" className="brand-mark" />
          <span>Synapse</span>
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`main-nav${menuOpen ? " main-nav-open" : ""}`} aria-label="Navigation principale">
          <a className="nav-link nav-link-active" href="#accueil" onClick={() => setMenuOpen(false)}>Accueil</a>
          <a className="nav-link" href="#evenements" onClick={() => setMenuOpen(false)}>Événements</a>
          <div className="header-actions">
            <Button variant="outline" onClick={() => { setDialog({ type: "auth", mode: "login" }); setMenuOpen(false); }}>Connexion</Button>
            <Button onClick={() => { setDialog({ type: "auth", mode: "signup" }); setMenuOpen(false); }}><Users size={16} /> Créer un compte</Button>
          </div>
        </nav>
      </header>

      <main>
        <section className="home-main" id="accueil">
          <div className="page-width">
            <div className="hero">
              <div className="hero-copy">
                <span className="eyebrow"><Sparkles size={14} /> Événements de la vie universitaire</span>
                <h1>Toute la vie du campus, <span>au même endroit.</span></h1>
                <p className="hero-description">Découvrez les événements, inscrivez-vous en un clic et posez vos questions à Campus AI.</p>
                <div className="hero-facts">
                  <span><CalendarDays size={17} /> {events.length} événements à venir</span>
                  <span><Tag size={17} /> 4 catégories</span>
                  <span><Check size={17} /> Inscription en un clic</span>
                </div>
              </div>
              <div className="hero-visual">
                <span className="hero-orbit" aria-hidden="true" />
                <img className="hero-campus" src="/images/campus-hero.jpg" alt="Allée fleurie et bâtiments du campus universitaire" />
                <button className="ai-badge" onClick={() => setDialog({ type: "ai" })}>
                  <span className="ai-icon"><Sparkles size={18} /></span>
                  <span><strong>Campus AI</strong><small>Posez vos questions</small></span>
                </button>
                <button className="next-event" onClick={() => setSelectedEvent(events[0])}>
                  <span className="next-event-label"><CalendarDays size={15} /> PROCHAIN ÉVÉNEMENT</span>
                  <strong>{events[0].title}</strong>
                  <span>{events[0].date} · {events[0].venue}</span>
                  <Seats event={events[0]} compact />
                </button>
              </div>
            </div>

            <section className="events-section" id="evenements" aria-labelledby="events-heading">
              <div className="section-heading-row">
                <div>
                  <span className="section-kicker">À ne pas manquer</span>
                  <h2 id="events-heading">Événements à venir</h2>
                </div>
                <span className="result-count">{filteredEvents.length} événement{filteredEvents.length === 1 ? "" : "s"}</span>
              </div>

              <div className="filters" role="search">
                <label className="search-field">
                  <Search size={19} aria-hidden="true" />
                  <span className="sr-only">Rechercher un événement ou un lieu</span>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un événement, un lieu…" />
                  {search && <button className="clear-search" aria-label="Effacer la recherche" onClick={() => setSearch("")}><X size={16} /></button>}
                </label>
                <label className="select-field">
                  <Building2 size={17} aria-hidden="true" />
                  <span className="sr-only">Filtrer par ville</span>
                  <select aria-label="Toutes les villes" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option>Toutes les villes</option>
                    <option>Khouribga</option>
                  </select>
                  <ChevronDown size={17} aria-hidden="true" />
                </label>
                <div className="category-tabs" aria-label="Catégories d’événements">
                  {categories.map((item) => <button key={item} className={`category-tab${category === item ? " category-tab-active" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
                </div>
              </div>

              {filteredEvents.length ? <div className="event-grid">
                {filteredEvents.map((event) => <EventCard key={event.id} event={event} isFavorite={favorites.includes(event.id)} onFavorite={() => setFavorites((current) => current.includes(event.id) ? current.filter((id) => id !== event.id) : [...current, event.id])} onView={() => setSelectedEvent(event)} />)}
              </div> : <div className="empty-state"><Search size={24} /><h3>Aucun événement trouvé</h3><p>Essayez un autre mot-clé ou choisissez une autre catégorie.</p><Button variant="outline" onClick={() => { setSearch(""); setCategory("Tous"); setLocation("Toutes les villes"); }}>Effacer les filtres</Button></div>}
            </section>

            <aside className="organizer-banner">
              <div className="organizer-copy"><span className="organizer-eyebrow"><Building2 size={15} /> Espace organisateur</span><h2>Vous organisez des événements ?</h2><p>Créez, modifiez et suivez vos événements depuis l’espace organisateur. Chaque événement est publié après validation par l’administrateur.</p></div>
              <Button variant="sand" onClick={() => setDialog({ type: "auth", mode: "organizer" })}>Accéder à l’espace organisateur <ArrowRight size={16} /></Button>
              <span className="organizer-detail" aria-hidden="true" />
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-inner"><a className="brand footer-brand" href="#accueil" aria-label="Synapse, accueil"><img src={logo} alt="" className="brand-mark" /><span>Synapse</span></a><p>Plateforme de vie étudiante · Faculté Polydisciplinaire de Khouribga · Université Sultan Moulay Slimane</p><div className="footer-links"><a href="#evenements">Événements</a><button onClick={() => setDialog({ type: "ai" })}>Campus AI</button><button onClick={() => setDialog({ type: "auth", mode: "login" })}>Connexion</button></div></div></footer>

      {(selectedEvent || dialog) && <Dialog onClose={closeDialog}>
        {selectedEvent ? <EventDetails event={selectedEvent} isFavorite={favorites.includes(selectedEvent.id)} onFavorite={() => setFavorites((current) => current.includes(selectedEvent.id) ? current.filter((id) => id !== selectedEvent.id) : [...current, selectedEvent.id])} onJoin={() => setDialog({ type: "auth", mode: "login" })} /> : dialog?.type === "auth" ? <AuthPanel mode={dialog.mode} onSwitch={(mode) => setDialog({ type: "auth", mode })} /> : <AIPanel />}
      </Dialog>}
    </div>
  );
}

function Seats({ event, compact = false }) {
  const filled = event.total === event.remaining ? 20 : Math.max(1, Math.round((event.total - event.remaining) / event.total * 20));
  return <div className={`seats${compact ? " seats-compact" : ""}`}><span className="seat-track" aria-label={event.full ? "Événement complet" : `${event.remaining} places restantes`}>{Array.from({ length: 20 }, (_, i) => <i className={i < filled ? "seat-filled" : ""} key={i} />)}</span><span>{event.full ? "Complet" : `${event.remaining} places restantes`}</span></div>;
}

function EventCard({ event, isFavorite, onFavorite, onView }) {
  return <article className="event-card">
    <div className={`event-image${event.image ? "" : " event-image-art"}`}>
      {event.image && <img src={event.image} alt={event.imageAlt} loading="lazy" />}
      {!event.image && <Sparkles className="art-sparkle" size={24} aria-hidden="true" />}
      <span className="image-category">{event.category}</span>
      <button className={`favorite-button${isFavorite ? " favorite-active" : ""}`} aria-label={isFavorite ? `Retirer ${event.title} des favoris` : `Ajouter ${event.title} aux favoris`} aria-pressed={isFavorite} onClick={onFavorite}><Heart size={18} fill={isFavorite ? "currentColor" : "none"} /></button>
    </div>
    <div className="event-card-content">
      <span className="event-date"><CalendarDays size={15} /> {event.date} <span aria-hidden="true">·</span> {event.time}</span>
      <h3>{event.title}</h3>
      <p className="event-location"><MapPin size={15} /> {event.venue}</p>
      <div className="event-card-bottom"><Seats event={event} />
        {event.full ? <Button variant="outline" onClick={onView}>Liste d’attente</Button> : <Button size="sm" onClick={onView}>Voir <ArrowRight size={14} /></Button>}
      </div>
    </div>
  </article>;
}

function Dialog({ children, onClose }) {
  return <div className="dialog-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}><section className="dialog-panel" role="dialog" aria-modal="true"><button className="dialog-close" aria-label="Fermer" onClick={onClose}><X size={20} /></button>{children}</section></div>;
}

function EventDetails({ event, isFavorite, onFavorite, onJoin }) {
  return <div className="details-panel">
    {event.image ? <img className="details-image" src={event.image} alt={event.imageAlt} /> : <div className="details-image details-art"><Sparkles size={30} /></div>}
    <span className="eyebrow"><Tag size={14} /> {event.category}</span><h2>{event.title}</h2>
    <div className="details-facts"><span><CalendarDays size={17} />{event.date} · {event.time}</span><span><MapPin size={17} />{event.venue}, {event.city}</span><span><Users size={17} />Organisé par {event.organizer}</span></div>
    <p className="details-description">{event.description}</p>
    <div className="details-seats"><Seats event={event} /><span>{event.remaining} places sur {event.total}</span></div>
    {event.full ? <Button className="details-join" variant="outline" onClick={onJoin}>Rejoindre la liste d’attente <ArrowRight size={16} /></Button> : <Button className="details-join" onClick={onJoin}>S’inscrire à l’événement <ArrowRight size={16} /></Button>}
    <Button variant={isFavorite ? "secondary" : "outline"} className="favorite-action" onClick={onFavorite}><Heart size={16} fill={isFavorite ? "currentColor" : "none"} /> {isFavorite ? "Ajouté aux favoris" : "Ajouter aux favoris"}</Button>
    <p className="details-note">Connectez-vous pour vous inscrire. Annulation possible avant l’événement.</p>
  </div>;
}

function AuthPanel({ mode, onSwitch }) {
  const organizer = mode === "organizer";
  const signup = mode === "signup" || organizer;
  return <div className="auth-panel">
    <span className="eyebrow"><Users size={14} /> Espace {organizer ? "organisateur" : "étudiant"}</span>
    <h2>{organizer ? "Créer un compte organisateur" : signup ? "Créer un compte" : "Connexion"}</h2>
    <p>{signup ? "Rejoignez la communauté universitaire et profitez des services Synapse." : "Bon retour ! Connectez-vous pour accéder à votre espace."}</p>
    {signup && <div className="auth-name-fields"><label>Nom<input placeholder="Votre nom" /></label><label>Prénom<input placeholder="Votre prénom" /></label></div>}
    <label>Adresse e-mail<input type="email" placeholder="prenom.nom@usms.ac.ma" autoComplete="email" /></label>
    {organizer && <label>Organisation<input placeholder="Ex. Club IA, Bureau des stages…" /></label>}
    <label>Mot de passe<input type="password" placeholder="Au moins 8 caractères" autoComplete={signup ? "new-password" : "current-password"} /></label>
    {signup && <label>Confirmer le mot de passe<input type="password" placeholder="Confirmez votre mot de passe" autoComplete="new-password" /></label>}
    {!signup && <button className="forgot-link" onClick={() => onSwitch("reset")}>Mot de passe oublié ?</button>}
    {mode === "reset" && <div className="reset-note">Saisissez votre adresse e-mail pour recevoir les instructions de réinitialisation.</div>}
    <Button className="auth-submit" onClick={() => {}}>{signup ? organizer ? "Créer mon compte organisateur" : "Créer mon compte" : mode === "reset" ? "Envoyer les instructions" : "Se connecter"} <ArrowRight size={16} /></Button>
    <p className="auth-switch">{signup ? "Déjà un compte ?" : "Pas encore de compte ?"} <button onClick={() => onSwitch(signup ? "login" : "signup")}>{signup ? "Se connecter" : "Créer un compte"}</button></p>
    {organizer && <p className="organizer-note"><Check size={15} /> Vos événements sont publiés après validation par l’administrateur.</p>}
  </div>;
}

function AIPanel() {
  const [question, setQuestion] = useState("");
  return <div className="ai-panel"><span className="ai-icon"><Sparkles size={19} /></span><span className="eyebrow">Assistant du campus</span><h2>Bonjour ! Comment puis-je vous aider ?</h2><p>Posez une question sur les événements de la vie universitaire.</p><label className="ai-input"><span className="sr-only">Votre question</span><input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ex. Quels ateliers sont à venir ?" /><Button aria-label="Envoyer la question" onClick={() => setQuestion("")}><ArrowRight size={18} /></Button></label><span className="ai-footnote">Campus AI · Un guide pour vos événements du campus</span></div>;
}