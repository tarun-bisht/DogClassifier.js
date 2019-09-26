from flask import Flask
app=Flask(__name__)
app.config["SECRET_KEY"]="e89076000c4527e078a3110beaf20a43"
from classifier import routes