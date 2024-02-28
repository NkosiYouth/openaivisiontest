"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ref, useRef, useState } from "react";
import axios from "axios";

export default function Home() {
  const [aiResponse, setAIResponse] = useState("");
  const [base64, setBase64] = useState<string | ArrayBuffer | null>(null);
  const promptRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/vision", {
        image: base64,
        prompt: promptRef.current?.value,
      });
      console.log(res.data.response.message.content);
      setAIResponse(res?.data?.response?.message?.content);
    } catch (error) {
      // alert(error);
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-10">
      <h1 className="text-3xl">Testing OpenAI Vision.</h1>
      <div className="flex flex-col items-center gap-4">
        <input
          className="p-2 border-2" type="file" id="input"
          onChange={(e) => {
            if (e.target.files) {
              var reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = function () {
                setBase64(reader.result);
              };
              reader.onerror = function (error) {
                console.log("Error: ", error);
              };
            }
          }}
        />
        <Input ref={promptRef} type="text" placeholder="Type your prompt" />
        <Button disabled={!(base64)} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      {aiResponse && <p className="text-xl">{aiResponse}</p>}
    </main>
  );
}