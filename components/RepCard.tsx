"use client";
import { useState } from "react";
import { FIND_URL, partyName, salutation, type Member } from "@/lib/reps";
import { REP_TOKEN } from "@/lib/letters";
import { copyText } from "@/lib/clipboard";
import { track } from "@/lib/track";

type Props = { member: Member; role: string; message: string; script: string; onSent: () => void };

export default function RepCard({ member, role, message, script, onSent }: Props) {
  const [opened, setOpened] = useState(false);
  const [sent, setSent] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [showScript, setShowScript] = useState(false);
  const who = salutation(member);

  async function handleOpen() {
    const ok = await copyText(message.split(REP_TOKEN).join(who));
    setCopyFailed(!ok);
    setOpened(true);
    track("contact_opened", { chamber: member.chamber, copied: ok ? 1 : 0 });
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
          <a
            className="call secondary"
            href={`tel:+1${member.phone.replace(/\D/g, "")}`}
            aria-label={`Call ${member.name} at ${member.phone}`}
            onClick={() => track("call_started", { chamber: member.chamber })}
          >
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
              track("message_sent", { chamber: member.chamber });
            }}
          >
            {sent ? "✓ Sent" : "I sent it"}
          </button>
        )}
      </div>
      {member.phone && (
        <>
          <button
            type="button"
            className="link-btn"
            aria-expanded={showScript}
            onClick={() => {
              setShowScript((v) => !v);
              if (!showScript) track("script_viewed", { chamber: member.chamber });
            }}
          >
            {showScript ? "Hide what to say" : "What do I say on the phone?"}
          </button>
          {showScript && (
            <div className="script">
              <p className="hint">A staffer answers, takes your position, and logs it. Thirty seconds.</p>
              <pre>{script.replace("the Senator or Representative", who)}</pre>
              <button type="button" className="alt" onClick={() => copyText(script.replace("the Senator or Representative", who))}>
                Copy script
              </button>
            </div>
          )}
        </>
      )}
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
