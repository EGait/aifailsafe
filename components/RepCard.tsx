"use client";
import { useState } from "react";
import { FIND_URL, partyName, salutation, type Member } from "@/lib/reps";
import { REP_TOKEN } from "@/lib/letters";
import { copyText } from "@/lib/clipboard";

type Props = { member: Member; role: string; message: string; onSent: () => void };

export default function RepCard({ member, role, message, onSent }: Props) {
  const [opened, setOpened] = useState(false);
  const [sent, setSent] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const who = salutation(member);

  async function handleOpen() {
    const ok = await copyText(message.split(REP_TOKEN).join(who));
    setCopyFailed(!ok);
    setOpened(true);
  }

  return (
    <div className="card">
      <div className="top">
        <span className="name">{member.name}</span>
        <span className="chip">{partyName(member.party)}</span>
      </div>
      <div className="role">{role}</div>
      <div className="acts">
        <a className="call" href={member.contactForm || member.website || FIND_URL} target="_blank" rel="noopener noreferrer" onClick={handleOpen}>
          Email {who}
        </a>
        {member.phone && (
          <a className="alt" href={`tel:+1${member.phone.replace(/\D/g, "")}`} aria-label={`Call ${member.name} at ${member.phone}`}>
            Call {member.phone}
          </a>
        )}
        {opened && (
          <button
            type="button"
            className="alt"
            disabled={sent}
            onClick={() => {
              setSent(true);
              onSent();
            }}
          >
            {sent ? "✓ Sent" : "I sent it"}
          </button>
        )}
      </div>
      {opened && (
        <p className="hint">
          {copyFailed
            ? "Couldn’t copy automatically. Copy the message from the box above, then paste it into the form."
            : "Message copied. Paste it into the form that opened."}
        </p>
      )}
      {!member.contactForm && <p className="hint">This office has no direct form on file. Open their site, find “Contact,” and paste your message there.</p>}
    </div>
  );
}
